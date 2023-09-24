import { z } from "zod";
import { PostId } from "../model/post-id";

export const getPostIdDto = z.object({
    id: z.coerce.number().refine(PostId.is),
})

export type GetPostIdDto = z.infer<typeof getPostIdDto>;