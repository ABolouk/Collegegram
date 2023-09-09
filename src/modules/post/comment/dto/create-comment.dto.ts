import { z } from "zod"
import { PostId } from "../../model/post-id"
import { Contenet } from "../model/comment-content"

export const createCommentDto = z.object({
  postId: PostId.zod,
  content: Contenet.zod
})

export interface createCommentDto extends z.infer<typeof createCommentDto> { };