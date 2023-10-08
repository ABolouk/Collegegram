import { z } from "zod";
import {UserName} from "../../user/model/user.username";

export const getPostsDto = z.object({
    limit: z.coerce.number().nonnegative().min(1).max(20),
    startTime: z.coerce.date().optional(),
})

export const getOtherUserPost = z.object({
    username: UserName.zod,
    limit: z.coerce.number().nonnegative().min(1).max(20),
    startTime: z.coerce.date().optional(),
})