import { UserId } from "../../../user/model/user.id";
import { PostId } from "../../model/post-id";
import { CommentId } from "./comment-id";

export interface CommentInterface {
  id: CommentId;
  autherId: UserId;
  postId: PostId;
  content: string
}

export interface CreateCommentInterface {
  autherId: UserId;
  postId: PostId;
  content: string
}