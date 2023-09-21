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

export const makePostRouter = (userService: UserService, postService: PostService, commentService: CommentService) => {
	const app = Router();
	app.post("/", loginMiddle(userService), async (req, res) => {
		const data = createPostDto.parse(req.body);
		handleExpresss(res, () => postService.createPost(data));
	});

	app.get("/:id", loginMiddle(userService), async (req, res) => {
		const { postId } = getPostIdDto.parse(req.params);
		handleExpresss(res, () => postService.getPostById(postId));
	});

	app.post("/user", loginMiddle(userService), (req, res) => {
		const user = req.user;
		const { limit, page } = getPostsDto.parse(req.body)
		handleExpresss(res, () => postService.getPostsByUserId(user.id, limit, page));
	});

	app.post("/:id/comment", loginMiddle(userService), (req, res) => {
		const userId = req.user.id
		const postId = req.params.id
		const dto = createCommentDto.parse({ userId, postId, ...req.body })
		handleExpresss(res, () => commentService.comment(dto))
	})

	return app;
};