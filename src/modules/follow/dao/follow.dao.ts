import { z } from "zod";
import { FollowId } from "../model/follow.id";
import { followDao, followIdDao, UserFollowingsId } from "../model/follow";
import { UserId } from "../../user/model/user.id";

export const zodFollowIdDao = z.object({
    id: FollowId.zod,
}).transform((x): followIdDao => x)

export const zodFollowRellDao = z.object({
    id: FollowId.zod,
    interactionId: z.number(),
    followingId: UserId.zod,
    followerId: UserId.zod,
}).transform((x): followDao => x)


export const zodFollowingsId = z.array(z.object({
    followingId: UserId.zod
})).transform((x): UserFollowingsId => x)