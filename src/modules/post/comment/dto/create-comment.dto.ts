import { z } from "zod"
import { PostId } from "../../model/post-id"
import { Content } from "../model/comment-content"
import { UserId } from "../../../user/model/user.id"

export const createCommentDto = z.object({
  autherId: UserId.zod,
  postId: PostId.zod,
  content: Content.zod
})

export interface createCommentDto extends z.infer<typeof createCommentDto> { };