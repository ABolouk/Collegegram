import { UserId } from "../../../user/model/user.id";
import { PostId } from "../../model/post-id";
import z from "zod"
import { Content } from "../model/comment-content";
import { CommentInterface } from "../model/comment";
import {CommentId} from "../model/comment-id";

export const zodCommentDao = z.object({
  id: CommentId.zod,
  userId: UserId.zod,
  postId: PostId.zod,
  content: Content.zod
}).transform((x): CommentInterface => x)