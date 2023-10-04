import {z} from 'zod';
import {UserName} from '../../user/model/user.username';
import {UserId} from "../../user/model/user.id";

export const followDto = z.object({
    follower: UserId.zod,
    following: UserName.zod
})

export type followDtoType = z.infer<typeof followDto>;