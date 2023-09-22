import { z } from 'zod';
import { UserName } from '../../user/model/user.username';
export const followDto = z.object({
    UserName: UserName.zod
})

export type followDtoType = z.infer<typeof followDto>;