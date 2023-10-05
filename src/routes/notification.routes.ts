import { Router } from "express";
import { NotificationService } from "../modules/notification/notification.service";
import { loginMiddle } from "../login.middleware";
import { UserService } from "../modules/user/user.service";
import { handleExpresss } from "../utility/handle-express";
import { getNotificationsDto } from "../modules/notification/dto/get-notifications.dto";

export const makeNotificationRouter = (userService: UserService, notificationService: NotificationService) => {
    const app = Router();
    app.get('/', loginMiddle(userService), (req, res) => {
        const userId = req.user.id;
        const limit = req.query.limit;
        const startTime = req.query.startTime ? req.query.startTime : new Date();
        const dto = getNotificationsDto.parse({userId, limit, startTime});
        handleExpresss(res, () => notificationService.getMyNotifications(dto));
    });

    return app;
}