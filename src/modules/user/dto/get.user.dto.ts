import {z} from "zod";
import {UserName} from "../model/user.username";

export const getUserDto = z.object({
    userName: UserName.zod,
});

export type GetUserDtoType = z.infer<typeof getUserDto>;