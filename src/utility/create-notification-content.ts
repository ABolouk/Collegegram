import { BaseZodNotificationDaoType } from "../modules/notification/dao/notification.dao";
import { CommentNotification } from "../modules/notification/model/comment-notification";
import { LikeNotification } from "../modules/notification/model/like-notification";
import { FollowNotification } from "../modules/notification/model/follow-notification";
import {
    FollowRequestAcceptedNotification,
    FollowRequestPendingNotification
} from "../modules/notification/model/follow-request-notification";

export const createNotificationContent = (notification: BaseZodNotificationDaoType) => {
    const interactingUserFullName = `${notification.interactingUser.firstName} ${notification.interactingUser.lastName}`;
    switch (notification.type) {
        case CommentNotification:
            return `${interactingUserFullName} برای این عکس کامنت داده`;
        case LikeNotification:
            return `${interactingUserFullName} این عکس رو لایک کرده`;
        case FollowNotification:
            return `${interactingUserFullName} دنبالت کرد`;
        case FollowRequestPendingNotification:
            return `${interactingUserFullName} درخواست دوستی داده`;
        case FollowRequestAcceptedNotification:
            return `${interactingUserFullName} درخواست دوستیت رو قبول کرد`;
        default:
            return 'متن دیفالت نوتیفیکیشن';
    }
};
