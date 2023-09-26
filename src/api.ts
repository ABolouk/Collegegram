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
import cors from 'cors'
import {UserInteractionRepository} from "./modules/user-interaction/user-interaction.repository";
import {USerInteractionService} from "./modules/user-interaction/user-interaction.service";
import { BlockService } from "./modules/block/block.service";
import { BlockRepository } from "./modules/block/block.repository";


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
    const userInteractionRepo = new UserInteractionRepository(dataSource);
    const followRepo = new FollowRepository(dataSource);
    const followReqRepo = new followRequestRepository(dataSource);
    const userInteractionService = new USerInteractionService(userInteractionRepo);
    const followRellService = new followService(followRepo);
    const followReqService = new followRequestService(followReqRepo, followRellService);
    const emailService = new EmailService()
    const blockRepo = new BlockRepository(dataSource)
    const blockService = new BlockService(blockRepo)
    const userService = new UserService(userRepo, sessionRepo, emailService, userInteractionService, followReqService, followRellService, blockService);
    app.use("/user", makeUserRouter(userService, jwtService));

    const postRepo = new PostRepository(dataSource);
    const postService = new PostService(postRepo);
    const commentRepo = new CommentRepository(dataSource);
    const commentService = new CommentService(commentRepo, postService);
    app.use("/post", makePostRouter(userService, postService, commentService));

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