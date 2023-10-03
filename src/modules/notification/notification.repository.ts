import { z } from "zod";
import { DataSource, Repository } from "typeorm";
import { NotificationEntity } from "./entity/notification.entity";
import { NotificationId } from "./model/notification-id";
import { NotificationInterface } from "./model/notification";
import { zodNotificationDao } from "./dao/notification.dao";

export class NotificationRepository {
    private notificationRepo: Repository<NotificationEntity>;

    constructor(private appDataSource: DataSource) {
        this.notificationRepo = appDataSource.getRepository(NotificationEntity);
    }

    async getNotificationById(id: NotificationId): Promise<NotificationInterface | null> {
        return await this.notificationRepo.findOne({
            relations: ['users', 'posts', 'comments'],
            where: { id: id },
        }).then((x) => z.nullable(zodNotificationDao).parse(x));
    }
}