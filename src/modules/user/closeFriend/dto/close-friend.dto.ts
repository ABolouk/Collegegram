import {UserId} from "../../model/user.id";
import {z} from "zod";
import {UserName} from "../../model/user.username";

export const closeFriendDto = z.object({
    userId: UserId.zod,
    userName: UserName.zod,
});

export type CloseFriendDtoType = z.infer<typeof closeFriendDto>;