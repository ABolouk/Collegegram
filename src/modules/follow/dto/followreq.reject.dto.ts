import {z} from 'zod';
import {UserName} from '../../user/model/user.username';
import {UserId} from "../../user/model/user.id";

export const rejectFollowReq = z.object({
    following: UserId.zod,
    follower: UserName.zod
})

export type rejectFollowReqType = z.infer<typeof rejectFollowReq>;