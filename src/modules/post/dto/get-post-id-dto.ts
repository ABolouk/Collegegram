import { z } from "zod";
import { PostId } from "../model/post-id";

export const getPostIdDto = z.object({
    postId: z.number().refine(PostId.is),
})

export type GetPostIdDto = z.infer<typeof getPostIdDto>;