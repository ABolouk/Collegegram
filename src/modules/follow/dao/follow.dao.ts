import { z } from "zod";
import { FollowId } from "../model/follow.id";
import { followDao, followIdDao } from "../model/follow";
import { UserId } from "../../user/model/user.id";
import { FollowReqStatus } from "../model/follow.req.status";

export const zodFollowIdDao = z.object({
    id: FollowId.zod,
}).transform((x): followIdDao => x)

export const zodFollowRellDao = z.object({
    id: FollowId.zod,
    interactionId: z.number(),
    followingId: UserId.zod,
    followerId: UserId.zod,
    status: FollowReqStatus.zod,
}).transform((x): followDao => x)