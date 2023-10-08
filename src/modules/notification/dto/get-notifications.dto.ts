import { z } from "zod";
import { UserId } from "../../user/model/user.id";

export const getNotificationsDto = z.object({
    userId: UserId.zod,
    limit: z.coerce.number().nonnegative().min(1),
    startTime: z.coerce.date()
})

export type GetNotificationsDto = z.infer<typeof getNotificationsDto>;
