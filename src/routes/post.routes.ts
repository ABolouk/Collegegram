import { Router } from "express";
import { PostService } from "../modules/post/post.service";
import { CommentService } from "../modules/post/comment/comment.service";
import { createPostDto } from "../modules/post/dto/create-post.dto";
import { handleExpresss } from "../utility/handle-express";
import { loginMiddle } from "../login.middleware";
import { UserService } from "../modules/user/user.service";
import { createCommentDto } from "../modules/post/comment/dto/create-comment.dto";
import { getPostsDto } from "../modules/post/dto/get-posts-dto";
import { getPostIdDto } from "../modules/post/dto/get-post-id-dto";
import { uploadMultiple } from "../utility/multer";
import { BadRequestError } from "../utility/http-errors";

export const makePostRouter = (userService: UserService, postService: PostService, commentService: CommentService) => {
	const app = Router();
	app.post("/", loginMiddle(userService), uploadMultiple.array('post-photos'), async (req, res) => {
		const data = createPostDto.parse(req.body);
		if (!req.files) {
			return new BadRequestError("post has no images")
		}
		handleExpresss(res, () => postService.createPost(data, req.files as Express.Multer.File[]));
	});

	app.get("/:id", loginMiddle(userService), async (req, res) => {
		const { postId } = getPostIdDto.parse(req.params);
		handleExpresss(res, () => postService.getPostById(postId));
	});

	app.post("/user/:limit/:nextOffset?", loginMiddle(userService), (req, res) => {
		const user = req.user;
		const { limit, nextOffset } = getPostsDto.parse(req.params);
		handleExpresss(res, () => postService.getPostsByUserId(user.id, limit, nextOffset ? nextOffset : 0));
	});

	app.post("/:id/comment", loginMiddle(userService), (req, res) => {
		const dto = createCommentDto.parse({ ...req.body, postId: req.params.id })
		handleExpresss(res, () => commentService.comment(dto))
	})

	return app;
};