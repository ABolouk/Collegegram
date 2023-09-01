import jwt from "jsonwebtoken";
import { UserRepository } from './userRepository';
import { isUserName } from './model/user.username';
import { BadRequestError, ConflictError, NotFoundError, UnauthorizedError } from '../../utility/http-errors';
import { LoginDtoType } from './dto/login.dto';
import { isUserEmail } from './model/user.email';
import { ForgetPasswordDto } from './dto/forgetPassword.dto';
import { EmailService } from '../email/email.service';
import { resetPasswordRoute } from '../../routes/user.routes';
import { PayloadType, createMessageForOneTimeLink, createOneTimeLink, createOneTimeLinkSecret } from '../../utility/one-time-link';
import { isUserId, makeUserId } from './model/user.id';
import { sessionRepository } from './sessionRepository';
import { signupDto } from './dto/signup.dto';
import { CreateFullUserDao } from './dao/user.dao';
import { hashPassword, comparePasswords } from '../../utility/passwordUtils';
import { randomBytes } from 'crypto';
import { v4 } from 'uuid';
import { UserId } from './model/user.id';
import { EditProfileType } from "./dto/editProfile.dto";

export class UserService {
    constructor(private userRepository: UserRepository, private sessionRepo: sessionRepository, private emailService: EmailService) { }
    async login(loginDto: LoginDtoType) {
        const user = await (isUserEmail(loginDto.authenticator) ? this.userRepository.findByEmail(loginDto.authenticator) : this.userRepository.findByUsername(loginDto.authenticator));
        if (!user) {
            throw new NotFoundError("User");
        }
        const passwordsMatch = await comparePasswords(loginDto.password, user.password);
        if (!passwordsMatch) {
            throw new UnauthorizedError();
        }
        const accessToken = jwt.sign({ id: user.id },process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "1h" })
        const refreshToken = randomBytes(64).toString('hex')
        const time = loginDto.rememberMe ? 24 * 3600 * 1000 : 6 * 3600 * 1000;
        await this.sessionRepo.createSession(refreshToken, user.id, new Date(Date.now() + time));
        const userInfo = CreateFullUserDao(user)
        return { userInfo, accessToken, refreshToken };
    }
    async findById(id: UserId) {
        return this.userRepository.findById(id);
    }

    async findSessionByRefreshToken(token: string) {
        return this.sessionRepo.findSessionByRefreshToken(token);
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
            id: makeUserId(),
            username: dto.username,
            email: dto.email,
            password: hashedPassword,
            isPrivate: false

        };

        const newUser = await this.userRepository.createUser(user);
        
        return {success: true};
    }

    async forgetPassword({ authenticator }: ForgetPasswordDto) {

        if (!isUserEmail(authenticator) && !isUserName(authenticator)) {
            throw new UnauthorizedError();
        }

        const user = await (isUserEmail(authenticator) ? this.userRepository.findByEmail(authenticator) : this.userRepository.findByUsername(authenticator));

        if (!user) {
            throw new NotFoundError('User');
        }

        const expiresIn = 15  // minutes
        const subject = "CollegeGram: Reset Password"
        const oneTimeLink = createOneTimeLink(`${process.env.HOST_NAME}/user/${resetPasswordRoute}`, user, expiresIn)
        const description = createMessageForOneTimeLink(oneTimeLink, expiresIn);
        const fromEmail = process.env.EMAIL_SERVICE_USER;
        if (fromEmail === undefined) {
            throw new BadRequestError("service email not valid");
        }

        // TODO: we should check if the email has been recieved or not.
        this.emailService.sendEmail(fromEmail, user.email, subject, description)
        return {
            success: true,
        };
    }

    async getUserById(userId: string) {

        if (!isUserId(userId)) {
            throw new BadRequestError("Invalid userId");
        };

        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw new NotFoundError('User');
        };

        return user;
    }

    async resetPassword(userId: string, token: string, password1: string, password2: string) {
        if (!isUserId(userId)) {
            throw new UnauthorizedError();
        }

        const user = await this.getUserById(userId);

        const secret = createOneTimeLinkSecret(user)
        const payload = jwt.verify(token, secret) as PayloadType

        if (payload.userId !== user.id) {
            throw new UnauthorizedError()
        }

        if (password1 !== password2) {
            throw new BadRequestError("password1 and password2 are not equal")
        }
        
        this.userRepository.updatePasswordById(user.id, await hashPassword(password1));
        return { success: true };
    }

    async updateUserInfo(userId: UserId, editInfo: EditProfileType, file?: Express.Multer.File) {
        if (editInfo.password !== editInfo.confirmPassword) {
            throw new BadRequestError("رمز عبور و تکرار آن یکسان نیستند");
        }
        const editPass = hashPassword(editInfo.password)
        const user = await this.getUserById(userId);

        if (!user) {
            throw new NotFoundError('User');
        };
        const { confirmPassword, ...updateUserInfo } = { ...editInfo, avatar: file ? file.path : "default path", password: await editPass };

        this.userRepository.updateUser(user.id, updateUserInfo);
        return true;
    }

}