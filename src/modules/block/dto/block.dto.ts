import { UserName } from "../../user/model/user.username";
import {z} from "zod"

export const blockDto = z.object({
  userName: UserName.zod,
  blockedUserName: UserName.zod
})

export type BlockDtoType = z.infer<typeof blockDto>