import {z} from 'zod';
import {UserName} from '../../user/model/user.username';
import {UserId} from "../../user/model/user.id";

export const cancellFollowReq = z.object({
    follower: UserId.zod,
    following: UserName.zod
})

export type cancellFollowReqType = z.infer<typeof cancellFollowReq>;