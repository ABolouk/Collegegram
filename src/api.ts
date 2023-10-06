import express, {ErrorRequestHandler} from "express";
import {DataSource} from "typeorm";
import {UserRepository} from "./modules/user/user.repository";
import {UserHighService} from "./modules/user/user.high.service";
import {makeUserRouter} from "./routes/user.routes";
import {sessionRepository} from "./modules/user/session.repository";
import {ZodError} from "zod";
import {EmailService} from "./modules/email/email.service";
import {makePostRouter} from "./routes/post.routes";
import {PostRepository} from "./modules/post/post.repository";
import {PostHighService} from "./modules/post/post.high.service";
import {CommentService} from "./modules/post/comment/comment.service";
import {CommentRepository} from "./modules/post/comment/comment.repository";
import {FollowRepository} from "./modules/follow/follow.repository";
import {followRequestRepository} from "./modules/follow/follow-request.repository";
import {FollowRequestLowService} from "./modules/follow/follow.request.low.service";
import {FollowHighService} from "./modules/follow/follow.high.service";
import {JwtService} from "./modules/jwt/jwt.service";
import cors from 'cors';
import {BlockHighService} from "./modules/block/block.high.service";
import {BlockRepository} from "./modules/block/block.repository";
import {LikeRepository} from "./modules/post/like/like.repository";
import {LikeHighService} from "./modules/post/like/like.high.service";
import {HomePageService} from "./modules/post/home-page.service";
import {FollowLowService} from "./modules/follow/follow.low.service";
import {BlockLowService} from "./modules/block/block.low.service";
import {UserLowService} from "./modules/user/user.low.service";
import {SessionLowService} from "./modules/user/session.low.service";
import {PostLowService} from "./modules/post/post.low.service";
import {LikeLowService} from "./modules/post/like/like.low.service";
import {BookmarkService} from "./modules/bookmark/book-mark.service";
import {BookmarkRepository} from "./modules/bookmark/book-mark.repository";
import { SearchService } from "./modules/post/search.service";


export const makeApp = (dataSource: DataSource) => {
    const app = express();
    // app.use(cors({credentials: true, origin: '*', methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'] , allowedHeaders : '*' }))
    app.use(cors({
        origin: 'http://localhost:5173',
    }))
    app.use(express.json())
    const userRepo = new UserRepository(dataSource);
    const sessionRepo = new sessionRepository(dataSource);
    const followRepo = new FollowRepository(dataSource);
    const followReqRepo = new followRequestRepository(dataSource);
    const blockRepo = new BlockRepository(dataSource)
    const sessionLowService = new SessionLowService(sessionRepo)
    const jwtService = new JwtService(sessionRepo);
    const emailService = new EmailService()
    const blockLowService = new BlockLowService(blockRepo)
    const userLowService = new UserLowService(userRepo)
    const followLowService = new FollowLowService(followRepo);
    const followRequestLowService = new FollowRequestLowService(followReqRepo);
    const blockHighService = new BlockHighService(blockLowService, userLowService)
    const userHighService = new UserHighService(userLowService, sessionLowService, emailService);
    const followHighService = new FollowHighService(followLowService, followRequestLowService, userLowService);
    app.use("/user", makeUserRouter(userHighService, sessionLowService, userLowService, jwtService, followHighService, blockHighService));

    const postRepo = new PostRepository(dataSource);
    const commentRepo = new CommentRepository(dataSource);
    const postLowService = new PostLowService(postRepo);
    const likeRepo = new LikeRepository(dataSource);
    const likeLowService = new LikeLowService(likeRepo);
    const bookmarkRepo = new BookmarkRepository(dataSource)
    const bookmarkService = new BookmarkService(bookmarkRepo, postLowService, userLowService, followLowService)
    const postHighService = new PostHighService(postLowService, likeLowService, bookmarkService );
    const commentService = new CommentService(commentRepo, postLowService, userLowService, followLowService);
    const homePageService = new HomePageService(postHighService, userLowService, followLowService, likeLowService, bookmarkService);
    const likeHighService = new LikeHighService(likeLowService, postLowService, userLowService, followLowService);
    const searchService = new SearchService(postLowService, likeLowService)
    app.use("/post", makePostRouter(userLowService, sessionLowService, postHighService, commentService, homePageService, likeHighService , bookmarkService, searchService));

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