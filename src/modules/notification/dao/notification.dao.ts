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

const baseZodNotificationDao = z.object({
    interactingUserId: UserId.zod,
    interactedUser: zodUserDao,
    interactedUserId: UserId.zod,
    interactingUser: zodUserDao,
    type: NotificationType.zod,
    postId: PostId.zod.optional(),
    post: zodPostDao.optional(),
    commentId: CommentId.zod.optional(),
    comment: zodCommentDao.optional(),
    updatedAt: z.date(),
})

export type BaseZodNotificationDaoType = z.infer<typeof baseZodNotificationDao>;

export const zodMyNotificationDao =
    baseZodNotificationDao
        .transform((x): FrontEndNotificationInterface => ({
            content: createMyNotificationContent(x),
            postId: x.postId,
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
            photo: x.type in [CommentNotification, LikeNotification] ? x.post?.photos[0] : x.interactedUser.avatar,
            type: x.type,
            updatedAt: x.updatedAt,
        }));

export type ZodMyFriendsNotificationDao = z.infer<typeof zodMyFriendsNotificationDao>;
