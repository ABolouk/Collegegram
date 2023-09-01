import { Router } from "express";
import { loginDto } from '../modules/user/dto/login.dto';
import { handleExpresss } from "../utility/handleExpress";
import { UserService } from '../modules/user/userService';
import { forgetPasswordDto } from "../modules/user/dto/forgetPassword.dto";
import { BadRequestError } from "../utility/http-errors";
import { signupDto } from "../modules/user/dto/signup.dto";
import { loginMiddle } from "../loginMiddle";
import { editProfile } from "../modules/user/dto/editProfile.dto";
import { upload } from "../utility/multer";
export const resetPasswordRoute = "reset_password"


export const makeUserRouter = (userService: UserService) => {
	const app = Router();
	app.post("/login", (req, res) => {
		const dto = loginDto.parse(req.body);
		handleExpresss(res, () => userService.login(dto));
	});

	app.post("/register", (req, res) => {
		const dto = signupDto.parse(req.body);
		handleExpresss(res, () => userService.signup(dto), 201)
	})
	app.post("/login/forget", (req, res) => {
		const dto = forgetPasswordDto.parse(req.body);
		handleExpresss(res, () => userService.forgetPassword(dto));
	})

	app.post(`/${resetPasswordRoute}/:userId/:token`, async (req, res) => {
		const { userId, token } = req.params;
		const { password1, password2 } = req.body;

		handleExpresss(res, () => userService.resetPassword(userId, token, password1, password2));
	})
	app.post("/editProfile", loginMiddle(userService), upload.single('avatar'), (req, res) => {
		const dto = editProfile.parse(req.body);
		handleExpresss(res, () => userService.updateUserInfo(req.user.id, dto, req.file));
	});
	return app;
};