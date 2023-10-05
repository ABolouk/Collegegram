import { NotificationRepository } from "./notification.repository";
import { CreateNotificationInterface } from "./model/notification";
import { likeEventEmmmiter } from "../../data/event-handling";
import { PostId } from "../post/model/post-id";
import { UserId } from "../user/model/user.id";
import { LikeNotification, LikeNotificationType } from "./model/like-notification";
import { GetNotificationsDto } from "./dto/get-notifications.dto";
import { PostLowService } from "../post/post.low.service";

export class NotificationService {
    constructor(
        private notificationRepository: NotificationRepository,
        private postLowService: PostLowService,
    ) {
        likeEventEmmmiter.on('like', async (userId: UserId, postId: PostId) => {
            const interactingUserId = userId;
            const interactedUserId = await this.postLowService.getAuthorById(postId);
            const newNotification: CreateNotificationInterface = {
                interactingUserId: interactingUserId,
                interactedUserId: interactedUserId,
                type: LikeNotification as LikeNotificationType,
                postId: postId,
            }
            await this.notificationRepository.create(newNotification);
        })
    }

    async getMyNotifications(dto: GetNotificationsDto) {
        return await this.notificationRepository.getNotificationsByUserId(dto);
    }
}