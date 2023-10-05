import express, {ErrorRequestHandler} from "express";
import {DataSource} from "typeorm";
import {UserRepository} from "./modules/user/user.repository";
import {UserService} from "./modules/user/user.service";
import {makeUserRouter} from "./routes/user.routes";
import {sessionRepository} from "./modules/user/session.repository";
import {ZodError} from "zod";
import {EmailService} from "./modules/email/email.service";
import {makePostRouter} from "./routes/post.routes";
import {PostRepository} from "./modules/post/post.repository";
import {PostService} from "./modules/post/post.service";
import {CommentService} from "./modules/post/comment/comment.service";
import {CommentRepository} from "./modules/post/comment/comment.repository";
import {FollowRepository} from "./modules/follow/follow.repository";
import {followRequestRepository} from "./modules/follow/follow-request.repository";
import {followRequestService} from "./modules/follow/follow.request.service";
import {followService} from "./modules/follow/follow.service";
import {JwtService} from "./modules/jwt/jwt.service";
import cors from 'cors';
import { BlockService } from "./modules/block/block.service";
import { BlockRepository } from "./modules/block/block.repository";
import {LikeRepository} from "./modules/post/like/like.repository";
import {LikeService} from "./modules/post/like/like.service";
import { HomePageService } from "./modules/post/home-page.service";
import { makeNotificationRouter } from "./routes/notification.routes";
import { NotificationService } from "./modules/notification/notification.service";
import { NotificationRepository } from "./modules/notification/notification.repository";


export const makeApp = (dataSource: DataSource) => {
    const app = express();
    // app.use(cors({credentials: true, origin: '*', methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'] , allowedHeaders : '*' }))
    app.use(cors({
        origin: 'http://localhost:5173',
    }))
    app.use(express.json())
    const userRepo = new UserRepository(dataSource);
    const sessionRepo = new sessionRepository(dataSource);
    const jwtService = new JwtService(sessionRepo);
    const followRepo = new FollowRepository(dataSource);
    const followReqRepo = new followRequestRepository(dataSource);
    const emailService = new EmailService()
    const blockRepo = new BlockRepository(dataSource)
    const blockService = new BlockService(blockRepo)
    const userService = new UserService(userRepo, sessionRepo, emailService, blockService);
    const followReqService = new followRequestService(followReqRepo);
    const followRellService = new followService(followRepo, followReqService, userService);
    app.use("/user", makeUserRouter(userService, jwtService, followRellService));

    const postRepo = new PostRepository(dataSource);
    const postService = new PostService(postRepo);
    const commentRepo = new CommentRepository(dataSource);
    const commentService = new CommentService(commentRepo, postService);
    const homePageService = new HomePageService(postService, userService, followRellService);
    const likeRepo = new LikeRepository(dataSource);
    const likeService = new LikeService(likeRepo, postService, userService, followRellService);
    app.use("/post", makePostRouter(userService, postService, commentService, homePageService,likeService));

    const notificationRepo = new NotificationRepository(dataSource);
    const notificationService = new NotificationService(notificationRepo, postService);
    app.use("/notification", makeNotificationRouter(userService, notificationService))

    app.use((req, res, next) => {
        next();
    })

    const zodErrorHanlder: ErrorRequestHandler = (
        error,
        req,
        res,
        next,
    ) => {
        if (error instanceof ZodError) {
            res.status(400).send({message: error.issues});
        }
        res.status(500).send({message: "خطایی رخ داده است. لطفا دوباره تلاش کنید."});
    };
    app.use(zodErrorHanlder);
    return app
}