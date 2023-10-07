import { z } from "zod"
import { UserId } from "../../user/model/user.id"

export const GetBookmarkDto = z.object({
  userId: UserId.zod,
  limit: z.coerce.number().nonnegative().min(1).max(20),
  startTime: z.coerce.date()
})

export type GetBookmarkDtoType = z.infer<typeof GetBookmarkDto>;