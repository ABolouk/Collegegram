import {z} from "zod";
import {FrontEndNotificationInterface, NotificationType} from "../model/notification";
import {UserId} from "../../user/model/user.id";
import {CommentId} from "../../post/comment/model/comment-id";
import {PostId} from "../../post/model/post-id";
import {zodUserDao} from "../../user/dao/user.dao";
import {zodPostDao} from "../../post/dao/post.dao";
import {zodCommentDao} from "../../post/comment/dao/create-comment.dao";
import {CommentNotification} from "../model/comment-notification";
import {LikeNotification} from "../model/like-notification";
import {
    createMyFriendsNotificationContent,
    createMyNotificationContent
} from "../../../utility/create-notification-content";
import {NotificationUser} from "../model/notification-user";
import {NotificationPost} from "../model/notification-post";
import {NotificationComment} from "../model/notification-comment";

const baseZodNotificationDao = z.object({
    interactingUserId: UserId.zod,
    interactedUser: NotificationUser.zod,
    interactedUserId: UserId.zod,
    interactingUser: NotificationUser.zod,
    type: NotificationType.zod,
    postId: z.nullable(PostId.zod.optional()),
    post: z.nullable(NotificationPost.zod.optional()),
    commentId: z.nullable(CommentId.zod.optional()),
    comment: z.nullable(NotificationComment.zod.optional()),
    updatedAt: z.date(),
})

export type BaseZodNotificationDaoType = z.infer<typeof baseZodNotificationDao>;

export const zodMyNotificationDao =
    baseZodNotificationDao
        .transform((x): FrontEndNotificationInterface => ({
            content: createMyNotificationContent(x),
            postId: x.postId,
            username: x.interactingUser.username,
            photo: x.type in [CommentNotification, LikeNotification] ? x.post?.photos[0] : x.interactedUser.avatar,
            type: x.type,
            updatedAt: x.updatedAt,
        }));

export type ZodMyNotificationDaoType = z.infer<typeof zodMyNotificationDao>;

export const zodMyFriendsNotificationDao =
    baseZodNotificationDao
        .transform((x): FrontEndNotificationInterface => ({
            content: createMyFriendsNotificationContent(x),
            postId: x.postId,
            username: x.interactingUser.username,
            photo: x.type in [CommentNotification, LikeNotification] ? x.post?.photos[0] : x.interactedUser.avatar,
            type: x.type,
            updatedAt: x.updatedAt,
        }));

export type ZodMyFriendsNotificationDao = z.infer<typeof zodMyFriendsNotificationDao>;
