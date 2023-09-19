import { z} from "zod"
import { UserInteractionInterface } from "../model/user-interaction"
import { UserId } from "../../user/model/user.id"

export const zodUserInteractionDao = z
  .object({
    id: z.number(),
    userId1: UserId.zod,
    userId2: UserId.zod

  }).transform((x): UserInteractionInterface => x)

