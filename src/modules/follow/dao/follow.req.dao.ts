import { z } from "zod";
import { FollowReqId } from "../model/follow.req.id";
import { followReqIdDao } from "../model/follow.request";

export const zodFollowReqIdDao = z.object({
    id: FollowReqId.zod,
}).transform((x): followReqIdDao => x)