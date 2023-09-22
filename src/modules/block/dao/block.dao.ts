import { z } from "zod"
import { UserId } from "../../user/model/user.id"
import { BlockInterface } from "../model/block"

export const zodBlockDao = z
  .object({
    id: z.number(),
    userId: UserId.zod,
    blockedUserId: UserId.zod

  }).transform((x): BlockInterface => x)

