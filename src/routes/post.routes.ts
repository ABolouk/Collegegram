import { Router } from "express";
import { PostService } from "../modules/post/post.service";
import { createPostDto } from "../modules/post/dto/create-post.dto";
import { handleExpresss } from "../utility/handleExpress";
import { loginMiddle } from "../loginMiddle";
import { UserService } from "../modules/user/userService";

export const makePostRouter = (userService: UserService, postService: PostService) => {
	const app = Router();
	app.post("/", async (req, res) => {
		const data = createPostDto.parse(req.body);
		handleExpresss(res, () => postService.createPost(data));
	});

	app.get("/:id", loginMiddle(userService), (req, res) => {
		const { id } = req.params;


		// handleExpresss(res, () => );
	});

	app.post("/user", (req, res) => {

		// handleExpresss(res, () => );
	});

	return app;
};