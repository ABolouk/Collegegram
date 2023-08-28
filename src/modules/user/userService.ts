import { UserRepository } from './userRepository';
import { isUserName } from './model/user.username';
import { NotFoundError, UnauthorizedError } from '../../utility/http-errors';
import { LoginDtoType } from './dto/login.dto';
import { isUserEmail } from './model/user.email';
import { UserInformation } from './model/user';
import jwt from 'jsonwebtoken';
import { UserId } from './model/user.id';
import { randomBytes } from 'crypto';
import { sessionRepository } from './sessionRepository';

export class UserService {
    constructor(private userRepository: UserRepository, private sessionRepo: sessionRepository) { }
    async login({ authenticator, password, rememberMe }: LoginDtoType) {
        if (!isUserEmail(authenticator) && !isUserName(authenticator)) {
            throw new UnauthorizedError();
        }
        const user = await (isUserEmail(authenticator) ? this.userRepository.findByEmail(authenticator) : this.userRepository.findByUsername(authenticator));
        if (!user) {
            throw new NotFoundError();
        }
        if (user.password !== password) {
            throw new UnauthorizedError();
        }
        const accessToken = jwt.sign({id : user.id}, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn:  "1h"})
        const refreshToken = randomBytes(64).toString('hex');
        const time = rememberMe ? 24 * 3600 * 1000 : 6 * 3600 * 1000;
        await this.sessionRepo.createSession(refreshToken, user.id, new Date(Date.now() + time));
        const { password: _, id: __, ...userRest } = user
        const userInfo = userRest as UserInformation;
        return {userInfo, accessToken, refreshToken};
    }
    async findById(id: UserId) {
        return this.userRepository.findById(id);
    }

    async findSessionByToken(token: string) {
        return this.sessionRepo.findSessionByToken(token);
    }

    async deleteToken(token: string) {
        return this.sessionRepo.deleteToken(token);
    }
}