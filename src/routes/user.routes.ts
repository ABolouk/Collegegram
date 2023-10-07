import { Router } from "express";
import { loginDto } from '../modules/user/dto/login.dto';
import { handleExpresss } from "../utility/handle-express";
import { UserHighService } from '../modules/user/user.high.service';
import { forgetPasswordDto } from "../modules/user/dto/forget-password.dto";
import { signupDto } from "../modules/user/dto/signup.dto";
import { loginMiddle } from "../login.middleware";
import { editProfile } from "../modules/user/dto/edit-profile.dto";
import { followDto } from '../modules/follow/dto/follow.dto';
import { unfollowDto } from "../modules/follow/dto/unfollow.dto";
import { JwtService } from "../modules/jwt/jwt.service";
import { blockDto } from "../modules/block/dto/block.dto";
import { getUserDto } from "../modules/user/dto/get.user.dto";
import { FollowHighService } from "../modules/follow/follow.high.service";
import { acceptFollowReq } from "../modules/follow/dto/followreq.accept.dto";
import { rejectFollowReq } from "../modules/follow/dto/followreq.reject.dto";
import { uploadAvatarMinIO } from "../utility/multer";
import { UserLowService } from "../modules/user/user.low.service";
import { SessionLowService } from "../modules/user/session.low.service";
import { BlockHighService } from "../modules/block/block.high.service";

export const resetPasswordRoute = "reset_password"


export const makeUserRouter = (userHighService: UserHighService, sessionLowService: SessionLowService, userLowService: UserLowService, jwtService: JwtService, followHighService: FollowHighService, blockHighService: BlockHighService) => {
    const app = Router();
    app.post("/login", (req, res) => {
        const dto = loginDto.parse(req.body);
        handleExpresss(res, () => userHighService.login(dto));
    });

    app.post("/register", (req, res) => {
        const dto = signupDto.parse(req.body);
        handleExpresss(res, () => userHighService.signup(dto), 201)
    })

    app.get("/getUserProfile/:userName", loginMiddle(userLowService, sessionLowService), (req, res) => {
        const userName = req.params.userName
        const dto = getUserDto.parse({userName});
        handleExpresss(res, () => userHighService.getUserProfile(dto, req.user.id));
    });

    app.get("/getUser", loginMiddle(userLowService, sessionLowService), (req, res) => {
        handleExpresss(res, () => userHighService.getUser(req.user.id));
    });

    app.post("/login/forget", (req, res) => {
        const dto = forgetPasswordDto.parse(req.body);
        handleExpresss(res, () => userHighService.forgetPassword(dto));
    })

    app.post(`/${resetPasswordRoute}/:userId/:token`, async (req, res) => {
        const { userId, token } = req.params;
        const { password1, password2 } = req.body;
        handleExpresss(res, () => userHighService.resetPassword(userId, token, password1, password2));
    })
    app.put("/editProfile", loginMiddle(userLowService, sessionLowService), uploadAvatarMinIO.single('avatar'), (req, res) => {
        const dto = editProfile.parse(req.body);
        handleExpresss(res, () => userHighService.updateUserInfo(req.user.id, dto, req.file));
    });
    app.post("/verifyToken", async (req, res) => {
        // const dto = jwtDto.parse(req.body)
        handleExpresss(res, () => jwtService.verify(req.body))
    })
    app.post("/follow", loginMiddle(userLowService, sessionLowService), (req, res) => {
        const follower = req.user.id;
        const following = req.body.userName
        const dto = followDto.parse({ follower, following })
        handleExpresss(res, () => followHighService.createFollowRelation(dto));
    });
    app.post("/unfollow", loginMiddle(userLowService, sessionLowService), (req, res) => {
        const follower = req.user.id;
        const following = req.body.userName
        const dto = unfollowDto.parse({ follower, following })
        handleExpresss(res, () => followHighService.unfollow(dto));
    });
    app.post("/acceptFollowRequest", loginMiddle(userLowService, sessionLowService), (req, res) => {
        const follower = req.user.id;
        const following = req.body.userName
        const dto = acceptFollowReq.parse({ follower, following })
        handleExpresss(res, () => followHighService.acceptFollowRequest(dto));
    });
    app.post("/rejectFollowRequest", loginMiddle(userLowService, sessionLowService), (req, res) => {
        const follower = req.user.id;
        const following = req.body.userName
        const dto = rejectFollowReq.parse({ follower, following })
        handleExpresss(res, () => followHighService.rejectFollowRequest(dto));
    });
    app.post("/cancelFollowRequest", loginMiddle(userLowService, sessionLowService), (req, res) => {
        const follower = req.user.id;
        const following = req.body.userName
        const dto = followDto.parse({ follower, following })
        handleExpresss(res, () => followHighService.cancelFollowRequest(dto));
    });

    app.post("/block", loginMiddle(userLowService, sessionLowService), (req, res) => {
        const follower = req.user.id;
        const following = req.body.userName
        const dto = blockDto.parse({ follower, following })
        handleExpresss(res, () => blockHighService.block(dto))
    })

    app.post("/unblock", loginMiddle(userLowService, sessionLowService), (req, res) => {
        const follower = req.user.id;
        const following = req.body.userName
        const dto = blockDto.parse({ follower, following })
        handleExpresss(res, () => blockHighService.unblock(dto))
    })

    return app

};