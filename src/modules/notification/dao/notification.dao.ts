import { z } from "zod";
import { NotificationInterface, NotificationType } from "../model/notification";
import { NotificationId } from "../model/notification-id";
import { NotificationUser } from "../model/notification-user";
import { NotificationPost } from "../model/notification-post";
import { NotificationComment } from "../model/notification-comment";

export const zodNotificationDao = z.object({
    id: NotificationId.zod,  // TODO: should probably remove this!
    interactingUser: NotificationUser.zod,
    interactedUser: NotificationUser.zod,
    type: NotificationType.zod,
    post: NotificationPost.zod.optional(),
    comment: NotificationComment.zod.optional(),
    updatedAt: z.date(),
}).transform((x): NotificationInterface => x);
