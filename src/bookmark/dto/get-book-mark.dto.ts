import { z } from "zod"
import { UserId } from "../../modules/user/model/user.id"

export const GetBookMarkDto = z.object({
  userId: UserId.zod,
  limit: z.coerce.number().nonnegative().min(1).max(20),
  startTime: z.coerce.date()
})

export type GetBookMarkDtoType = z.infer<typeof GetBookMarkDto>;