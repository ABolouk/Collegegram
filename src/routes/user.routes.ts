import { Router } from "express";
import { loginDto } from '../modules/user/dto/login.dto';
import { handleExpresss } from "../utility/handleExpress";
import { UserService } from '../modules/user/userService';




export const makeUserRouter = (userService : UserService) => {
	const app = Router();
	app.post("/login", (req, res) => {
		const dto = loginDto.parse(req.body);
        handleExpresss(res, () => userService.login(dto));
	});
	return app;
};