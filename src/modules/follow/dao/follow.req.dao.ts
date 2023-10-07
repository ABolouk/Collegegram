import { z } from "zod";
import { FollowReqId } from "../model/follow.req.id";
import {followReqDao, followReqIdDao} from "../model/follow.request";
import {UserId} from "../../user/model/user.id";
import {FollowReqStatus} from "../model/follow.req.status";

export const zodFollowReqIdDao = z.object({
    id: FollowReqId.zod,
}).transform((x): followReqIdDao => x)

export const zodFollowReqDao = z.object({
    id: FollowReqId.zod,
    followingId: UserId.zod,
    followerId: UserId.zod,
    status: FollowReqStatus.zod,
}).transform((x): followReqDao => x)