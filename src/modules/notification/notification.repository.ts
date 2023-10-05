import { z } from "zod";
import { DataSource, LessThan, Repository } from "typeorm";
import { NotificationEntity } from "./entity/notification.entity";
import { NotificationId } from "./model/notification-id";
import { CreateNotificationInterface, NotificationInterface } from "./model/notification";
import { zodNotificationDao } from "./dao/notification.dao";
import { GetNotificationsDto } from "./dto/get-notifications.dto";

export class NotificationRepository {
    private notificationRepo: Repository<NotificationEntity>;

    constructor(private appDataSource: DataSource) {
        this.notificationRepo = appDataSource.getRepository(NotificationEntity);
    }

    async create(notification: CreateNotificationInterface) {
        return zodNotificationDao.parse(await this.notificationRepo.save(notification));
    }

    async getNotificationById(id: NotificationId): Promise<NotificationInterface | null> {
        return await this.notificationRepo.findOne({
            relations: ['users', 'posts', 'comments'],
            where: { id: id },
        }).then((x) => z.nullable(zodNotificationDao).parse(x));
    }

    async getNotificationsByUserId(dto: GetNotificationsDto) {
        const [notifications, count] = await this.notificationRepo.findAndCount({
            // relations: ["posts", "comments"],
            where: {
                interactedUserId: dto.userId,
                createdAt: LessThan(dto.startTime),
            },
            order: { createdAt: 'desc' },
            take: dto.limit,
        })
        const hasMore = count > dto.limit;
        return {
            notifications: notifications.map(x => zodNotificationDao.parse(x)),
            nextOffset: notifications.length !== 0 ? notifications[notifications.length - 1].createdAt : new Date(),
            hasMore: hasMore,
        }
    }
}