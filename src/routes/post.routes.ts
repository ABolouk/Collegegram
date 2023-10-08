import {Router} from "express";
import {CommentService} from "../modules/post/comment/comment.service";
import {createPostDto} from "../modules/post/dto/create-post.dto";
import {handleExpresss} from "../utility/handle-express";
import {loginMiddle} from "../login.middleware";
import {createCommentDto} from "../modules/post/comment/dto/create-comment.dto";
import {getOtherUserPost, getPostsDto} from "../modules/post/dto/get-posts-dto";
import {getPostIdDto} from "../modules/post/dto/get-post-id-dto";
import {uploadMinIO} from "../utility/multer";
import {BadRequestError} from "../utility/http-errors";
import {likeDto} from "../modules/post/like/dto/like.dto";
import {LikeHighService} from "../modules/post/like/like.high.service";
import {homePageDto} from "../modules/post/dto/home-page.dto";
import {HomePageService} from "../modules/post/home-page.service";
import {UserLowService} from "../modules/user/user.low.service";
import {SessionLowService} from "../modules/user/session.low.service";
import {CreateBookmarkDto} from "../modules/bookmark/dto/create-book-mark.dto";
import { GetBookmarkDto} from "../modules/bookmark/dto/get-book-mark.dto";
import {BookmarkService} from "../modules/bookmark/book-mark.service";
import {PostHighService} from "../modules/post/post.high.service";
import {exploreDto} from "../modules/post/dto/explore.dto";
import {ExploreService} from "../modules/post/explore.service";
import { GetCommentDto } from "../modules/post/comment/dto/get-comment.dto";
import { SearchDto } from "../modules/post/dto/search.dto";
import { SearchService } from "../modules/post/search.service";

export const makePostRouter = (userLowService: UserLowService, sessionLowService: SessionLowService, postHighService: PostHighService, commentService: CommentService, homePageService: HomePageService, likeHighService: LikeHighService, bookmarkService: BookmarkService, searchService: SearchService, exploreService: ExploreService) => {
    const app = Router();
    app.post("/", loginMiddle(userLowService, sessionLowService), uploadMinIO.array('post-photos'), (req, res) => {
        const data = createPostDto.parse(req.body);
        if (!req.files) {
            return new BadRequestError("post has no images")
        }
        handleExpresss(res, () => postHighService.createPost(data, req.files as Express.Multer.File[], req.user));
    });

    app.get("/home", loginMiddle(userLowService, sessionLowService), (req, res) => {
        const userId = req.user.id
        const limit = req.query.limit
        const startTime = req.query.startTime ? req.query.startTime : new Date()
        const dto = homePageDto.parse({ userId, limit, startTime })
        handleExpresss(res, () => homePageService.getHome(dto))
    })

    app.get("/search", loginMiddle(userLowService, sessionLowService), (req, res) => {
        const userId = req.user.id
        const limit = req.query.limit
        const startTime = req.query.startTime ? req.query.startTime : new Date()
        const tag = req.query.tag
        const dto = SearchDto.parse({ userId, tag, limit, startTime })
        handleExpresss(res, () => searchService.search(dto))
    })

    app.get("/bookmarks", loginMiddle(userLowService, sessionLowService), (req, res) => {
        const userId = req.user.id
        const limit = req.query.limit
        const startTime = req.query.startTime ? req.query.startTime : new Date()
        const dto = GetBookmarkDto.parse({ userId, limit, startTime })
        handleExpresss(res, () => bookmarkService.getBookmarks(dto))
    })

    app.get("/explore", loginMiddle(userLowService, sessionLowService), (req, res) => {
        const userId = req.user.id
        const limit = req.query.limit
        const startTime = req.query.startTime ? req.query.startTime : new Date()
        const dto = exploreDto.parse({ userId, limit, startTime })
        handleExpresss(res, () => exploreService.getExplore(dto))
    })

    app.get("/user", loginMiddle(userLowService, sessionLowService), (req, res) => {
        const {limit, startTime} = getPostsDto.parse(req.query);
        handleExpresss(res, () => postHighService.getPostsByUserId(req.user.id, limit, startTime ? startTime : new Date()));
    });

    app.get("/user/:username", loginMiddle(userLowService, sessionLowService), (req, res) => {
        const username = req.params.username;
        const limit = req.query.limit;
        const startTime = req.query.startTime;
        const dto = getOtherUserPost.parse({username, limit, startTime});
        handleExpresss(res, () => postHighService.getPostsByUsername(dto.username, dto.limit, dto.startTime ? dto.startTime : new Date() , req.user.id));
    });

    app.get("/:id/comments", loginMiddle(userLowService, sessionLowService), (req, res) => {
        const userId = req.user.id
        const postId = req.params.id
        const limit = req.query.limit
        const startTime = req.query.startTime ? req.query.startTime : new Date()
        const dto = GetCommentDto.parse({ userId, postId, limit, startTime })
        handleExpresss(res, () => commentService.getComments(dto));
    })

    app.get("/:id", loginMiddle(userLowService, sessionLowService), (req, res) => {
        const userId = req.user.id
        const {id} = getPostIdDto.parse(req.params);
        handleExpresss(res, () => postHighService.getPostById(id, userId));
    });

    app.post("/:id/comment", loginMiddle(userLowService, sessionLowService), (req, res) => {
        const userId = req.user.id
        const postId = req.params.id
        const dto = createCommentDto.parse({userId, postId, ...req.body})
        handleExpresss(res, () => commentService.comment(dto))
    })

    app.get("/:id/like", loginMiddle(userLowService, sessionLowService), (req, res) => {
        const userId = req.user.id
        const postId = req.params.id
        const dto = likeDto.parse({userId, postId, ...req.body})
        handleExpresss(res, () => likeHighService.like(dto))
    })

    app.get("/:id/unlike", loginMiddle(userLowService, sessionLowService), (req, res) => {
        const userId = req.user.id
        const postId = req.params.id
        const dto = likeDto.parse({userId, postId, ...req.body})
        handleExpresss(res, () => likeHighService.unlike(dto))
    })

    app.post("/bookmark", loginMiddle(userLowService, sessionLowService), (req, res) => {
        const userId = req.user.id
        const postId = req.body.id
        const dto = CreateBookmarkDto.parse({userId, postId})
        handleExpresss(res, () => bookmarkService.bookmark(dto))
    })

    app.post("/unbookmark", loginMiddle(userLowService, sessionLowService), (req, res) => {
        const userId = req.user.id
        const postId = req.body.id
        const dto = CreateBookmarkDto.parse({userId, postId})
        handleExpresss(res, () => bookmarkService.unBookmark(dto))
    })

    return app;
};