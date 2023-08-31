import { Router } from "express";
import { loginDto } from '../modules/user/dto/login.dto';
import { handleExpresss } from "../utility/handleExpress";
import { UserService } from '../modules/user/userService';
import { forgetPasswordDto } from "../modules/user/dto/forgetPassword.dto";
import { BadRequestError } from "../utility/http-errors";
import { signupDto } from "../modules/user/dto/signup.dto";
import { loginMiddle } from "../loginMiddle";
import multer from 'multer';
import { editProfile } from "../modules/user/dto/editProfile.dto";
export const resetPasswordRoute = "reset_password"


export const makeUserRouter = (userService: UserService) => {
	const app = Router();
	app.post("/login", (req, res) => {
		console.log(req.body);
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

	const storage = multer.diskStorage({
		destination: (req, file, cb) => {
			cb(null, './media')
		},
		filename: (req, file, cb) => {
			cb(null, Date.now() + "-" + req.user.username + "-" + file.originalname)
		}
	})
	const upload = multer({ storage: storage })
	app.post("/editProfile", loginMiddle(userService), upload.single('avatar'), (req, res) => {
		const dto = editProfile.parse(req.body);
		handleExpresss
	});
	return app;
};