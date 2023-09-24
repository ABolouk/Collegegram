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
import {UserAuth} from "./model/user.auth"
import {loginUserInterface} from "./model/user";
import {followDtoType} from '../follow/dto/follow.dto';
import {FollowReqStatus} from '../follow/model/follow.req.status';
import {followRequestService} from "../follow/follow.request.service";
import {followService} from "../follow/follow.service";
import {UserName} from "./model/user.username";
import {USerInteractionService} from "../user-interaction/user-interaction.service";

export class UserService {
    constructor(private userRepository: UserRepository, private sessionRepo: sessionRepository, private emailService: EmailService, private userInteractionService: USerInteractionService, private followReqService: followRequestService, private followRellService: followService) {
    }

    async login(loginDto: LoginDtoType) {
        const user = await this.userRepository.findByEmailOrUsername(loginDto.authenticator)
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
        await this.sessionRepo.createSession(refreshToken, user.id, new Date(Date.now() + time));
        return {accessToken, refreshToken};
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
        const accessToken = jwt.sign({id: user.id}, process.env.ACCESS_TOKEN_SECRET as string, {expiresIn: "5m"})
        const refreshToken = randomBytes(64).toString('hex')
        return {accessToken, refreshToken};
    }

    async forgetPassword({authenticator}: ForgetPasswordDto) {
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
        }

        const user = await this.userRepository.findById(userId);

        if (!user) {
            throw new NotFoundError('User');
        }

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
        return {success: true};
    }

    async updateUserInfo(userId: UserId, editInfo: EditProfileType, file?: Express.Multer.File) {
        if (editInfo.password !== editInfo.confirmPassword) {
            throw new BadRequestError("رمز عبور و تکرار آن یکسان نیستند");
        }
        const editPass = Password.makeHashed(editInfo.password)
        const user = await this.getUserById(userId);

        if (!user) {
            throw new NotFoundError('User');
        }
        ;
        const {confirmPassword, ...updateUserInfo} = {
            ...editInfo,
            avatar: file ? file.path : "default path",
            password: await editPass
        };

        await this.userRepository.updateUser(user.id, updateUserInfo);
        return await this.getUserById(userId);
    }

    async getUserIdByUserName(username: UserName) {
        const user = await this.userRepository.findByEmailOrUsername(username)
        if (!user) {
            return null
        }
        return user.id
    }

    async follow(dto: followDtoType, userId: UserId) {
        const followingUser = await this.userRepository.findByEmailOrUsername(dto.UserName);
        if (!followingUser) {
            throw new NotFoundError("User")
        }
        let userInteraction = await this.userInteractionService.getInteraction({
            userId1: userId,
            userId2: followingUser.id
        })
        if (!userInteraction) {
            userInteraction = await this.userInteractionService.createUserInteraction({
                userId1: userId,
                userId2: followingUser.id
            })
        }
        if (followingUser.isPrivate) {
            return await this.followReqService.createFollowRequest({
                interactionId: userInteraction.id,
                followerId: userId,
                followingId: followingUser.id,
                status: FollowReqStatus.status.pending
            })
        }
        return await this.followRellService.createFollowRelation({
            interactionId: userInteraction.id,
            followerId: userId,
            followingId: followingUser.id
        })
    }

    async unfollow(dto: followDtoType, followerId: UserId) {
        const followingUser = await this.userRepository.findByEmailOrUsername(dto.UserName);
        if (!followingUser) {
            throw new NotFoundError("User")
        }
        const res = (await this.followRellService.getFollowRelation({
            followerId: followerId,
            followingId: followingUser.id
        }))
        if (!res) {
            throw new ConflictError("You are not following this user")
        }
        return this.followRellService.deleteFollowRelation({followerId: followerId, followingId: followingUser.id})
    }

    async acceptFollowRequest(dto: followDtoType, followingId: UserId) {
        const followerUser = await this.userRepository.findByEmailOrUsername(dto.UserName);
        if (!followerUser) {
            throw new NotFoundError("User")
        }
        return await this.followReqService.followRequestAction({
            followerUserId: followerUser.id,
            followingUserId: followingId
        }, FollowReqStatus.status.accepted)
    }

    async rejectFollowRequest(dto: followDtoType, followingId: UserId) {
        const followerUser = await this.userRepository.findByEmailOrUsername(dto.UserName);
        if (!followerUser) {
            throw new NotFoundError("User")
        }
        return await this.followReqService.followRequestAction({
            followerUserId: followerUser.id,
            followingUserId: followingId
        }, FollowReqStatus.status.rejected)
    }

    async cancelFollowRequest(dto: followDtoType, followerId: UserId) {
        const followingUser = await this.userRepository.findByEmailOrUsername(dto.UserName);
        if (!followingUser) {
            throw new NotFoundError("User")
        }
        return await this.followReqService.followRequestAction({
            followerUserId: followerId,
            followingUserId: followingUser.id
        }, FollowReqStatus.status.cancelled)
    }
}