import { z } from "zod";
import { FollowReqId } from "../model/follow.req.id";
import { followReqDao } from "../model/follow.request";

export const zodFollowReqDao = z.object({
    id: FollowReqId.zod,
}).transform((x): followReqDao => x)