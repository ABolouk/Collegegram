import {z} from "zod";

export const getMyCollegeGramUserDto = z.object({
    limit: z.coerce.number().nonnegative().min(1).max(20),
    startTime: z.coerce.date()
});
