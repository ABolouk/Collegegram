import jwt from "jsonwebtoken";
import { UserRepository } from './user.repository';
import { BadRequestError, ConflictError, NotFoundError, UnauthorizedError } from '../../utility/http-errors';
import { LoginDtoType } from './dto/login.dto';
import { ForgetPasswordDto } from './dto/forget-password.dto';
import { EmailService } from '../email/email.service';
import { resetPasswordRoute } from '../../routes/user.routes';
import { PayloadType, createMessageForOneTimeLink, createOneTimeLink, createOneTimeLinkSecret } from '../../utility/one-time-link';
import { sessionRepository } from './session.repository';
import { signupDto } from './dto/signup.dto';
import { Password } from '../../utility/password-utils';
import { randomBytes } from 'crypto';
import { UserId } from './model/user.id';
import { EditProfileType } from "./dto/edit-profile.dto";
import { UserAuth } from "./model/user.auth"
import { loginUserInterface } from "./model/user";
import { followDtoType } from '../follow/dto/follow.dto';
import { FollowRequestRepository } from "../follow/follow-request.repository";
import { FollowRepository } from "../follow/follow.repository";
import { FollowReqStatus } from '../follow/model/follow.req.status';

export class UserService {
    constructor(private userRepository: UserRepository, private sessionRepo: sessionRepository, private emailService: EmailService, private followReqRepo: FollowRequestRepository, private followRepo: FollowRepository) { }
    async login(loginDto: LoginDtoType) {
        const user = await this.userRepository.findByEmailOrUsername(loginDto.authenticator)
        if (user === null) {
            throw new NotFoundError("User");
        }
        user
        const passwordsMatch = await Password.comparePasswords(loginDto.password, user.password)
        if (!passwordsMatch) {
            throw new UnauthorizedError();
        }
        const accessToken = jwt.sign({ id: user.id }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: "1h" })
        const refreshToken = randomBytes(64).toString('hex')
        const time = loginDto.rememberMe ? 24 * 3600 * 1000 : 6 * 3600 * 1000;
        const userInfo = await this.sessionRepo.createSession(refreshToken, user.id, new Date(Date.now() + time));
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
        const uniqueEmail = await this.userRepository.isUniqueEmail(dto.email);
        if (!uniqueEmail) {
            throw new ConflictError("ایمیل وارد شده از قبل در کالج‌گرام ثبت شده است")
        }

        const uniqueUsername = await this.userRepository.isUniqueUserName(
            dto.username
        );
        if (!uniqueUsername) {
            throw new ConflictError(
                "یوزرنیم وارد شده از قبل در کالج‌گرام ثبت شده است"
            );
        }


        if (dto.password !== dto.confirmPassword) {
            throw new BadRequestError("پسوردهایی که وارد کردید یکسان نیستند.")
        }

        const hashedPassword = await Password.makeHashed(dto.password);

        const user = {
            id: UserId.make(),
            username: dto.username,
            email: dto.email,
            password: hashedPassword,
            isPrivate: false
        };

        await this.userRepository.createUser(user);

        return { success: true };
    }

    async forgetPassword({ authenticator }: ForgetPasswordDto) {
        if (!UserAuth.is(authenticator)) {
            throw new UnauthorizedError();
        }

        const user = await this.userRepository.findByEmailOrUsername(authenticator);

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

        if (!UserId.is(userId)) {
            throw new BadRequestError("Invalid userId");
        };

        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw new NotFoundError('User');
        };

        return user;
    }

    async resetPassword(userId: string, token: string, password1: Password, password2: Password) { //DTO behtar nist??

        if (!UserId.is(userId)) {
            throw new UnauthorizedError();
        }

        const user = await this.getUserById(userId);

        const secret = createOneTimeLinkSecret(user as loginUserInterface) //????
        const payload = jwt.verify(token, secret) as PayloadType

        if (payload.userId !== user.id) {
            throw new UnauthorizedError()
        }

        if (password1 !== password2) {
            throw new BadRequestError("password1 and password2 are not equal")
        }

        this.userRepository.updatePasswordById(user.id, await Password.makeHashed(password1)); //???
        return { success: true };
    }

    async updateUserInfo(userId: UserId, editInfo: EditProfileType, file?: Express.Multer.File) {
        if (editInfo.password !== editInfo.confirmPassword) {
            throw new BadRequestError("رمز عبور و تکرار آن یکسان نیستند");
        }
        const editPass = Password.makeHashed(editInfo.password)
        const user = await this.getUserById(userId);

        if (!user) {
            throw new NotFoundError('User');
        };
        const { confirmPassword, ...updateUserInfo } = { ...editInfo, avatar: file ? file.path : "default path", password: await editPass };

        await this.userRepository.updateUser(user.id, updateUserInfo);
        const updatedUser = await this.getUserById(userId);
        return updatedUser;
    }

    async follow(dto: followDtoType, userId: UserId) {
        const followingUser = await this.userRepository.findByUsername(dto.UserName);
        if (!followingUser) {
            throw new NotFoundError("User")
        }

        if (await this.followRepo.getFollowRelation({ followerId: userId, followingId: followingUser.id })) {
            throw new ConflictError("You are already following this user")
        }

        if (followingUser.isPrivate === true) {
            await this.followReqRepo.createFollowRequest({ interactionId: 1, followerId: userId, followingId: followingUser.id, status: FollowReqStatus.status.pending })
            return { status: "pending" }
        }

        await this.followRepo.createFollowRelation({ interactionId: 1, followerId: userId, followingId: followingUser.id })
        return { status: "accepted" }
    }

    async unfollow(dto: followDtoType, userId: UserId) {
        const followingUser = await this.userRepository.findByUsername(dto.UserName);
        if (!followingUser) {
            throw new NotFoundError("User")
        }

        if (!(await this.followRepo.getFollowRelation({ followerId: userId, followingId: followingUser.id }))) {
            throw new ConflictError("You are not following this user")
        }

        await this.followRepo.deleteFollowRelation({ followerId: userId, followingId: followingUser.id })
        return { status: "unfollowed" }
    }

}