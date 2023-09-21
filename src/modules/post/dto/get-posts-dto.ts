import { z } from "zod";

export const getPostsDto = z.object({
    limit: z.number().nonnegative(),
    nextOffset: z.number().nonnegative().nullable(),
})

export type GetPostsDto = z.infer<typeof getPostsDto>;