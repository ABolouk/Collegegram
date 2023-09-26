import { z } from "zod";

export const getPostsDto = z.object({
    limit: z.coerce.number().nonnegative().min(1).max(20),
    startTime: z.coerce.date().optional(),
})
