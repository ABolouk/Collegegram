import { UserRepository } from './userRepository';
import { isUserName } from './model/user.username';
import { NotFoundError, UnauthorizedError } from '../../utility/http-errors';
import { LoginDtoType } from './dto/login.dto';
import { isUserEmail } from './model/user.email';
import jwt from 'jsonwebtoken';
import { UserId } from './model/user.id';
import { randomBytes } from 'crypto';
import { sessionRepository } from './sessionRepository';
import { comparePasswords } from '../../utility/passwordUtils';
import { CreateFullUserDao } from './dao/user.dao';

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
        const passwordsMatch = await comparePasswords(password, user.password);
        if (!passwordsMatch) {
            throw new UnauthorizedError();
        }
        const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "1h" })
        const refreshToken = randomBytes(64).toString('hex');
        const time = rememberMe ? 24 * 3600 * 1000 : 6 * 3600 * 1000;
        await this.sessionRepo.createSession(refreshToken, user.id, new Date(Date.now() + time));
        const userInfo = CreateFullUserDao(user)
        return { userInfo, accessToken, refreshToken };
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
    async signup(dto: signupDto) {

        const userByEmail = await this.userRepository.findByEmail(dto.email);
        if (userByEmail) {
            throw new ConflictError("ایمیل وارد شده از قبل در کالج‌گرام ثبت شده است")
        }

        const userByUsername = await this.userRepository.findByUsername(dto.username);
        if (userByUsername) {
            throw new ConflictError("یوزرنیم وارد شده از قبل در کالج‌گرام ثبت شده است")
        }

        if (dto.password !== dto.confirmPassword) {
            throw new BadRequestError("پسوردهایی که وارد کردید یکسان نیستند.")
        }

        const hashedPassword = await hashPassword(dto.password);

        const user = {
            id: v4() as UserId,
            username: dto.username,
            email: dto.email,
            password: hashedPassword

        };
        
        const newUser = await this.userRepository.createUser(user);
        const outputUser = CreateUserDao(newUser);
        return outputUser;
    }
}