import { Router } from "express";
import { loginDto } from '../modules/user/dto/login.dto';



export const makeUserRouter = () => {
	const app = Router();
	app.post("/login", (req, res) => {
		const dto = loginDto.parse(req.body);
        
	});
	return app;
};