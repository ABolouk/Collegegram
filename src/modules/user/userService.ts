import { UserRepository } from './userRepository';
import { isUserName } from './model/user.username';
import { NotFoundError, UnauthorizedError } from '../../utility/http-errors';
import { LoginDtoType } from './dto/login.dto';
import { isUserEmail } from './model/user.email';
import { UserInformation } from './model/user';


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
            // const { password: _, ...rest } = user
            return user as UserInformation;
        }
        if (isUserName(authenticator)) {
            const user = await this.userRepository.findByUsername(authenticator);
            if (!user) {
                throw new NotFoundError();
            }
            if (user.password !== password) {
                throw new UnauthorizedError();
            }
            return user as UserInformation;
        }
    }
}