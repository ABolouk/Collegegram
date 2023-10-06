import { z } from "zod"
import { PostId } from "../../model/post-id"
import { UserId } from "../../../user/model/user.id";

export const GetCommentDto = z.object({
  userId: UserId.zod,
  postId: PostId.zod,
  limit: z.coerce.number().nonnegative().min(1).max(20),
  startTime: z.coerce.date()
})

export type GetCommentDtoType = z.infer<typeof GetCommentDto>;