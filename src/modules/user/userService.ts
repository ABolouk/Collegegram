import { UserRepository } from './userRepository';
import { isUserName } from './model/user.username';
import { NotFoundError, UnauthorizedError } from '../../utility/http-errors';
import { LoginDtoType } from './dto/login.dto';
import { isUserEmail } from './model/user.email';
import { UserInformation } from './model/user';
import jwt  from 'jsonwebtoken';
import { UserId } from './model/user.id';

export class UserService {
    constructor(private userRepository: UserRepository) { }
    async login({ authenticator, password }: LoginDtoType){
        if (isUserEmail(authenticator)) {
            const user = await this.userRepository.findByEmail(authenticator);
            if (!user) {
                throw new NotFoundError();
            }
            if (user.password !== password) {
                throw new UnauthorizedError();
            }
            const accessToken = jwt.sign(user.id, process.env.ACCESS_TOKEN_SECRET as string)
            const { password: _ , id : __ , ...userInfo } = user
            return userInfo as UserInformation , accessToken;
        }
        if (isUserName(authenticator)) {
            const user = await this.userRepository.findByUsername(authenticator);
            if (!user) {
                throw new NotFoundError();
            }
            if (user.password !== password) {
                throw new UnauthorizedError();
            }
            const accessToken = jwt.sign(user.id, process.env.ACCESS_TOKEN_SECRET as string)
            const { password: _, id: __, ...userInfo } = user
            return userInfo as UserInformation , accessToken;
        }
    }
    async findById(id: UserId) {
        return this.userRepository.findById(id);
    }
}