import { z } from "zod";

export const getPostsDto = z.object({
    perPage: z.number().nonnegative(),
    pageNumber: z.number().nonnegative(),
})

export type GetPostDto = z.infer<typeof getPostsDto>;