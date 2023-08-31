import { z } from "zod"
import { zodPostId } from "../../model/post-id"

export const createCommentDto = z.object({
  postId: zodPostId,
  content: z.string().nonempty().max(255)
})

export interface createCommentDto extends z.infer<typeof createCommentDto> { };