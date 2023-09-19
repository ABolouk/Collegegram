import { z } from "zod"
import { UserId } from "../../user/model/user.id"
import { UserName } from "../../user/model/user.username"

export const blockDto = z.object({
  userId: UserId.zod,
  blockedUserName: UserName.zod
})

export type BlockDtoType = z.infer<typeof blockDto>