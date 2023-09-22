import { z } from "zod";

export const getPostsDto = z.object({
    limit: z.coerce.number().nonnegative(),
    nextOffset: z.coerce.number().nonnegative().nullable(),
})

export type GetPostsDto = z.infer<typeof getPostsDto>;