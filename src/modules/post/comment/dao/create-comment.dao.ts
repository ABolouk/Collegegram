import { UserId } from "../../../user/model/user.id";
import { PostId } from "../../model/post-id";
import { CommentEntity } from "../entity/comment.entity";

export interface CommentDao {
  autherId: UserId;
  postId: PostId;
  content: string
}

export const createCommentDao = (comment: CommentEntity): CommentDao => ({
  autherId: comment.userId,
  postId: comment.postId,
  content: comment.content
})