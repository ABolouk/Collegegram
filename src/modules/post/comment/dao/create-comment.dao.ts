import { UserId } from "../../../user/model/user.id";
import { PostId } from "../../model/post-id";
import z from "zod"
import { Content } from "../model/comment-content";
import { CommentInterface } from "../model/comment";

export const zodCommentDao = z.object({
  userId: UserId.zod,
  postId: PostId.zod,
  content: Content.zod
}).transform((x): CommentInterface => x)