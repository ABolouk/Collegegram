import { z } from "zod"
import { UserId } from "../../user/model/user.id"
import { BlockInterface, BlockRelationInterface } from "../model/block"

export const zodBlockDao = z
  .object({
    id: z.number(),
    userId: UserId.zod,
    blockedUserId: UserId.zod

  }).transform((x): BlockInterface => x)


export const zodBlockRellDao = z
  .object({
    userId: UserId.zod,
    blockedUserId: UserId.zod

  }).transform((x): BlockRelationInterface => x)

