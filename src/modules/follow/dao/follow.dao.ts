import { z } from "zod";
import { FollowId } from "../model/follow.id";
import { followDao, followIdDao, UserFollowingsId } from "../model/follow";
import { UserId } from "../../user/model/user.id";
import {followReqDao} from "../model/follow.request";
import {FollowReqStatus} from "../model/follow.req.status";
import {FollowReqId} from "../model/follow.req.id";

export const zodFollowIdDao = z.object({
    id: FollowId.zod,
}).transform((x): followIdDao => x)

export const zodFollowRellDao = z.object({
    id: FollowId.zod,
    followingId: UserId.zod,
    followerId: UserId.zod,
}).transform((x): followDao => x)


export const zodFollowingsId = z.array(z.object({
    followingId: UserId.zod
})).transform((x): UserFollowingsId => x)

export const zodFollowReqDao = z.object({
    id: FollowReqId.zod,
    followingId: UserId.zod,
    followerId: UserId.zod,
    status: FollowReqStatus.zod
}).transform((x): followReqDao => x)