import { UserId } from "../../../user/model/user.id";
import { PostId } from "../../model/post-id";
import z from "zod"
import { Contenet } from "../model/comment-content";

export const zodCommentDao = z.object({
  autherId: UserId.zod,
  postId: PostId.zod,
  content: Contenet.zod
})