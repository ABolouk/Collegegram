import { z } from "zod";
import { CommentNotificationType } from "./comment-notification";
import { LikeNotificationType } from "./like-notification";
import { FollowNotificationType } from "./follow-notification";
import {
    FollowRequestAcceptedNotificationType,
    FollowRequestPendingNotificationType
} from "./follow-request-notification";
import { NotificationUser } from "./notification-user";
import { NotificationPost } from "./notification-post";
import { NotificationComment } from "./notification-comment";
import { CommentId } from "../../post/comment/model/comment-id";
import { PostId } from "../../post/model/post-id";
import { UserId } from "../../user/model/user.id";
import {UserName} from "../../user/model/user.username";

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

export interface NotificationInterface {
    interactingUser: NotificationUser;
    interactedUser: NotificationUser;
    type: NotificationType;
    post?: NotificationPost;
    comment?: NotificationComment;
    updatedAt: Date;
}

export interface FrontEndNotificationInterface {
    content: string;
    postId?: PostId | null;
    username: UserName;
    photo: string | undefined;
    type: NotificationType;
    updatedAt: Date;
}

export interface CreateNotificationInterface {
    interactingUserId: UserId;
    interactedUserId: UserId;
    type: NotificationType;
    postId?: PostId;
    commentId?: CommentId;
}
