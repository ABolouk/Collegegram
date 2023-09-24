import {Router} from "express";
import {loginDto} from '../modules/user/dto/login.dto';
import {handleExpresss} from "../utility/handle-express";
import {UserService} from '../modules/user/user.service';
import {forgetPasswordDto} from "../modules/user/dto/forget-password.dto";
import {BadRequestError} from "../utility/http-errors";
import {signupDto} from "../modules/user/dto/signup.dto";
import {loginMiddle} from "../login.middleware";
import {upload} from "../utility/multer";
import {editProfile} from "../modules/user/dto/edit-profile.dto";
import {followDto} from '../modules/follow/dto/follow.dto';
import {unfollowDto} from "../modules/follow/dto/unfollow.dto";
import {followRequestDto} from "../modules/follow/dto/follow.request.dto";
import { JwtService } from "../modules/jwt/jwt.service";
import { jwtDto } from "../modules/jwt/dto/jwt.dto";
import { blockDto } from "../modules/block/dto/block.dto";
import {getUserDto} from "../modules/user/dto/get.user.dto";
export const resetPasswordRoute = "reset_password"


export const makeUserRouter = (userService: UserService, jwtService: JwtService) => {
	const app = Router();
	app.post("/login", (req, res) => {
		const dto = loginDto.parse(req.body);
		handleExpresss(res, () => userService.login(dto));
	});

    app.post("/register", (req, res) => {
        const dto = signupDto.parse(req.body);
        handleExpresss(res, () => userService.signup(dto), 201)
    })

    app.post("/getUserProfile", loginMiddle(userService), (req, res) => {
        const dto = getUserDto.parse(req.body);
        handleExpresss(res, () => userService.getUserProfile(dto, req.user.id));
    });

    app.post("/login/forget", (req, res) => {
        const dto = forgetPasswordDto.parse(req.body);
        handleExpresss(res, () => userService.forgetPassword(dto));
    })

    app.post(`/${resetPasswordRoute}/:userId/:token`, async (req, res) => {
        const {userId, token} = req.params;
        const {password1, password2} = req.body;
        handleExpresss(res, () => userService.resetPassword(userId, token, password1, password2));
    })
    app.post("/editProfile", loginMiddle(userService), upload.single('avatar'), (req, res) => {
        const dto = editProfile.parse(req.body);
        handleExpresss(res, () => userService.updateUserInfo(req.user.id, dto, req.file));
    });
    app.post("/verifyToken", async (req, res) => {
        // const dto = jwtDto.parse(req.body)
        handleExpresss(res, () => jwtService.verify(req.body))
    })
    app.post("/follow", loginMiddle(userService), (req, res) => {
        const dto = followDto.parse(req.body);
        handleExpresss(res, () => userService.follow(dto, req.user.id));
    });
    app.post("/unfollow", loginMiddle(userService), (req, res) => {
        const dto = unfollowDto.parse(req.body);
        handleExpresss(res, () => userService.unfollow(dto, req.user.id));
    });
    app.post("/acceptFollowRequest", loginMiddle(userService), (req, res) => {
        const dto = followRequestDto.parse(req.body);
        handleExpresss(res, () => userService.acceptFollowRequest(dto, req.user.id));
    });
    app.post("/rejectFollowRequest", loginMiddle(userService), (req, res) => {
        const dto = followRequestDto.parse(req.body);
        handleExpresss(res, () => userService.rejectFollowRequest(dto, req.user.id));
    });
    app.post("/cancelFollowRequest", loginMiddle(userService), (req, res) => {
        const dto = followRequestDto.parse(req.body);
        handleExpresss(res, () => userService.cancelFollowRequest(dto, req.user.id));
    });

    return app;
};