import {NotificationRepository} from "./notification.repository";
import {NotificationInterface} from "./model/notification";
import {User} from "../user/model/user";

export class NotificationService {
    constructor(private notificationRepository: NotificationRepository) {
    }

    async getMyNotifications(user: User): Promise<NotificationInterface[]> {
        return await this.notificationRepository.getNotificationsByUserId(user.id);
    }
}