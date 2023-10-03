import { z } from "zod";
import { CommentNotificationType } from "./comment-notification";
import { LikeNotificationType } from "./like-notification";
import { FollowNotificationType } from "./follow-notification";
import {
    FollowRequestAcceptedNotificationType,
    FollowRequestPendingNotificationType
} from "./follow-request-notification";

const allNotificationTypes = [
    CommentNotificationType,
    LikeNotificationType,
    FollowNotificationType,
    FollowRequestPendingNotificationType,
    FollowRequestAcceptedNotificationType,
] as const;

export type NotificationType =
    CommentNotificationType
    | LikeNotificationType
    | FollowNotificationType
    | FollowRequestPendingNotificationType
    | FollowRequestAcceptedNotificationType;

export module NotificationType {
    export const is = (value: string): value is NotificationType => allNotificationTypes.some(type => type.is(value));

    export const zod = z.string().refine(is);
}
