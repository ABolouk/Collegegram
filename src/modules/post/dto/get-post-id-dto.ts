import { z } from "zod";
import { isPostId } from "../model/post-id";

export const getPostIdDto = z.object({
    postId: z.number().refine(isPostId),
})

export type GetPostIdDto = z.infer<typeof getPostIdDto>;