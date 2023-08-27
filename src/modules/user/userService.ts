import { UserRepository } from './userRepository';
import { isUserName } from './model/user.username';
import { BadRequestError, ConflictError, DuplicateError, NotFoundError, UnauthorizedError } from '../../utility/http-errors';
import { LoginDtoType } from './dto/login.dto';
import { isUserEmail } from './model/user.email';
import { UserInformation } from './model/user';
import { signupDto } from './dto/signup.dto';
import { FullUserDao, UserDao } from './dao/user.dao';

export class UserService {
    constructor(private userRepository: UserRepository) { }
    async login({ authenticator, password }: LoginDtoType){
        if (isUserEmail(authenticator)) {
            const user = await this.userRepository.findByEmail(authenticator);
            if (!user) {
                throw new NotFoundError('Email');
            }
            if (user.password !== password) {
                throw new UnauthorizedError();
            }
            // const { password: _, ...rest } = user
            const outputUser = FullUserDao(user)
            return outputUser;
                
        }
        if (isUserName(authenticator)) {
            const user = await this.userRepository.findByUsername(authenticator);
            if (!user) {
                throw new NotFoundError('User');
            }
            if (user.password !== password) {
                throw new UnauthorizedError();
            }
            const outputUser = FullUserDao(user)
            return outputUser;
        }
    }
    async signup(dto: signupDto) {

        if (!dto.username || !dto.email || !dto.password || !dto.confirmPassword) {
            throw new BadRequestError("تمام فیلدهای ثبت نام مورد نیاز است.")
        }

        
        if (isUserEmail(dto.email)) {
            throw new ConflictError("ایمیل وارد شده از قبل در کالج‌گرام ثبت شده است")
        }

        if (isUserName(dto.username)) {
            throw new ConflictError("یوزرنیم وارد شده از قبل در کالج‌گرام ثبت شده است")
        }

        if (dto.password !== dto.confirmPassword) {
            throw new BadRequestError("پسوردهایی که وارد کردید یکسان نیستند.")
        }

        return true;
    }
}