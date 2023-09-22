import { z } from 'zod';
import { UserName } from '../../user/model/user.username';
export const unfollowDto = z.object({
    UserName: UserName.zod
})

export type unfollowDtoType = z.infer<typeof unfollowDto>;