import { UserId } from "../../../user/model/user.id";
import { PostId } from "../../model/post-id";
import { Content } from "./comment-content";
import { CommentId } from "./comment-id";

export interface CommentInterface {
  userId: UserId;
  postId: PostId;
  content: Content
}