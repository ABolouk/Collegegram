import { z } from "zod";

export const getPostsDto = z.object({
    limit: z.number().nonnegative(),
    page: z.number().nonnegative(),
})

export type GetPostsDto = z.infer<typeof getPostsDto>;