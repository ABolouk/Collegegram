import { Router } from "express";
import { PostService } from "../modules/post/post.service";
import { CommentService } from "../modules/post/comment/comment.service";
import { createPostDto } from "../modules/post/dto/create-post.dto";
import { handleExpresss } from "../utility/handleExpress";
import { loginMiddle } from "../loginMiddle";
import { UserService } from "../modules/user/userService";
import { isPostId } from "../modules/post/model/post-id";
import { BadRequestError } from "../utility/http-errors";
import { createCommentDto } from "../modules/post/comment/dto/create-comment.dto";
import { getPostsDto } from "../modules/post/dto/get-post-dto";

export const makePostRouter = (userService: UserService, postService: PostService, commentService: CommentService) => {
  const app = Router();
  app.post("/", loginMiddle(userService), async (req, res) => {
    const data = createPostDto.parse(req.body);
    handleExpresss(res, () => postService.createPost(data));
  });

  app.get("/:id", loginMiddle(userService), async (req, res) => {
    const { id } = req.params;
    if (!Number.isInteger(id)) {
      throw new BadRequestError('not a valid postId');
    }
    const postId = +(id);
    if (!isPostId(postId)) {
      throw new BadRequestError('not a valid postId');
    }
    handleExpresss(res, () => postService.getPostById(postId));
  });

  app.post("/user", loginMiddle(userService), (req, res) => {
    const user = req.user;
    const { perPage, pageNumber } = getPostsDto.parse(req.body)
    handleExpresss(res, () => postService.getPostsByUserId(user.id, perPage, pageNumber));
  });

  app.post("/:id/comment", loginMiddle(userService), (req, res) => {
    const dto = createCommentDto.parse({ ...req.body, postId: req.params.id })
    handleExpresss(res, () => commentService.comment(dto))

  })
  return app;
};