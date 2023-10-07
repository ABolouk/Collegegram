import jwt from "jsonwebtoken";
import {UserRepository} from './user.repository';
import {BadRequestError, ConflictError, NotFoundError, UnauthorizedError} from '../../utility/http-errors';
import {LoginDtoType} from './dto/login.dto';
import {ForgetPasswordDto} from './dto/forget-password.dto';
import {EmailService} from '../email/email.service';
import {resetPasswordRoute} from '../../routes/user.routes';
import {
    createMessageForOneTimeLink,
    createOneTimeLink,
    createOneTimeLinkSecret,
    PayloadType
} from '../../utility/one-time-link';
import {sessionRepository} from './session.repository';
import {signupDto} from './dto/signup.dto';
import {Password} from '../../utility/password-utils';
import {randomBytes} from 'crypto';
import {UserId} from './model/user.id';
import {EditProfileType} from "./dto/edit-profile.dto";
import {UserAuth} from "./model/user.auth";
import {FollowRequestLowService} from "../follow/follow.request.low.service";
import {FollowHighService} from "../follow/follow.high.service";
import {UserName} from "./model/user.username";
import {BlockDtoType} from "../block/dto/block.dto";
import {BlockHighService} from "../block/block.high.service";
import {BlockRelationInterface, UnblockRelationInterface} from "../block/model/block";
import {GetUserDtoType} from "./dto/get.user.dto";
import {User} from "./model/user";
import {UserLowService} from "./user.low.service";
import {BlockLowService} from "../block/block.low.service";
import {SessionLowService} from "./session.low.service";

export class UserHighService {
    constructor(private userLowService: UserLowService, private sessionLowService: SessionLowService, private emailService: EmailService, private blockService: BlockLowService) {
    }

    async login(loginDto: LoginDtoType) {
        const user = await this.userLowService.findByEmailOrUsername(loginDto.authenticator)
        if (user === null) {
            throw new NotFoundError("User");
        }

        const passwordsMatch = await Password.comparePasswords(loginDto.password, user.password)
        if (!passwordsMatch) {
            throw new UnauthorizedError();
        }
        const accessToken = jwt.sign({id: user.id}, process.env.ACCESS_TOKEN_SECRET as string, {expiresIn: "5m"})
        const refreshToken = randomBytes(64).toString('hex')
        const time = loginDto.rememberMe ? 24 * 3600 * 1000 : 6 * 3600 * 1000;
        await this.sessionLowService.createSession(refreshToken, user.id, new Date(Date.now() + time));
        return {accessToken, refreshToken};
    }

    async signup(dto: signupDto) {
        const uniqueEmail = await this.userLowService.isUniqueEmail(dto.email);
        if (!uniqueEmail) {
            throw new ConflictError("ایمیل وارد شده از قبل در کالج‌گرام ثبت شده است")
        }

        const uniqueUsername = await this.userLowService.isUniqueUserName(
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

        await this.userLowService.createUser(user);
        const accessToken = jwt.sign({id: user.id}, process.env.ACCESS_TOKEN_SECRET as string, {expiresIn: "5m"})
        const refreshToken = randomBytes(64).toString('hex')
        return {accessToken, refreshToken};
    }

    async getUserProfile(dto: GetUserDtoType, userId: UserId) {
        const user = await this.userLowService.findByEmailOrUsername(dto.userName);
        if (!user) {
            throw new NotFoundError("User")
        }
        const checkBlock = await this.blockService.checkIfUsersBlockedEachOther({ userId: userId, blockedUserId: user.id })
        if (checkBlock) {
            return {
                blockStatus: checkBlock,
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                postCount: user.postCount,
                followerCount: 0,
                followingCount: 0,
                avatar: user.avatar
             }
        }
        if (user.id !== userId) {
            return {
                username: user.username,
                firstName: user.firstName,
                lastName: user.lastName,
                postCount: user.postCount,
                followerCount: user.followerCount,
                followingCount: user.followingCount,
                avatar: user.avatar,
                bio: user.bio,
                isPrivate: user.isPrivate
            }
        }

        return new BadRequestError("You can not see your profile");
    }


    async getUser(userId: UserId) {
        const user = await this.userLowService.findById(userId);
        if (!user) {
            throw new NotFoundError("User")
        }
        return {
            email: user.email,
            username: user.username,
            firstName: user.firstName,
            lastName: user.lastName,
            postCount: user.postCount,
            followerCount: user.followerCount,
            followingCount: user.followingCount,
            avatar: user.avatar,
            bio: user.bio,
            isPrivate: user.isPrivate
        }
    }

    async forgetPassword({authenticator}: ForgetPasswordDto) {
        if (!UserAuth.is(authenticator)) {
            throw new UnauthorizedError();
        }

        const user = await this.userLowService.findByEmailOrUsername(authenticator);

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

    async resetPassword(userId: string, token: string, password1: Password, password2: Password) { //DTO behtar nist??

        if (!UserId.is(userId)) {
            throw new UnauthorizedError();
        }

        const user = await this.userLowService.getUserById(userId);

        const secret = createOneTimeLinkSecret(user as User) //????
        const payload = jwt.verify(token, secret) as PayloadType

        if (payload.userId !== user.id) {
            throw new UnauthorizedError()
        }

        if (password1 !== password2) {
            throw new BadRequestError("password1 and password2 are not equal")
        }

        this.userLowService.updatePasswordById(user.id, await Password.makeHashed(password1)); //???
        return {success: true};
    }

    async updateUserInfo(userId: UserId, editInfo: EditProfileType, file?: Express.Multer.File) {
        if (editInfo.password !== editInfo.confirmPassword) {
            throw new BadRequestError("رمز عبور و تکرار آن یکسان نیستند");
        }
        const editPass = Password.makeHashed(editInfo.password)
        const user = await this.userLowService.getUserById(userId);

        if (!user) {
            throw new NotFoundError('User');
        }
        ;
        const {confirmPassword, ...updateUserInfo} = {
            ...editInfo,
            avatar: file ? "https://collegegrammedia.darkube.app/collegegram-avatars/" + file.key : user.avatar,
            password: await editPass
        };

        await this.userLowService.updateUser(user.id, updateUserInfo);
        return await this.getUser(userId);
    }
}