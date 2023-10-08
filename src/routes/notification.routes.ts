import { Router } from "express";
import { NotificationService } from "../modules/notification/notification.service";
import { loginMiddle } from "../login.middleware";
import { UserLowService} from "../modules/user/user.low.service";
import { handleExpresss } from "../utility/handle-express";
import { getNotificationsDto } from "../modules/notification/dto/get-notifications.dto";
import {SessionLowService} from "../modules/user/session.low.service";

export const makeNotificationRouter = (userLowService: UserLowService, sessionLowService: SessionLowService, notificationService: NotificationService) => {
    const app = Router();
    app.get('/user', loginMiddle(userLowService, sessionLowService), (req, res) => {
        const userId = req.user.id;
        const limit = req.query.limit;
        const startTime = req.query.startTime ? req.query.startTime : new Date();
        const dto = getNotificationsDto.parse({userId, limit, startTime});
        handleExpresss(res, () => notificationService.getMyNotifications(dto));
    });

    app.get('/user/followers', loginMiddle(userLowService, sessionLowService), (req, res) => {
        const userId = req.user.id;
        const limit = req.query.limit;
        const startTime = req.query.startTime ? req.query.startTime : new Date();
        const dto = getNotificationsDto.parse({userId, limit, startTime});
        handleExpresss(res, () => notificationService.getMyFriendsNotifications(dto));
    });

    return app;
}