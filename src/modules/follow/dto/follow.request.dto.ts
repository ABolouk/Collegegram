import { z } from 'zod';
import { UserName } from '../../user/model/user.username';
export const followRequestDto = z.object({
    UserName: UserName.zod
})

export type followRequestDtoType = z.infer<typeof followRequestDto>;