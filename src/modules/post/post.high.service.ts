import {NotFoundError} from "../../utility/http-errors";
import {UserId} from "../user/model/user.id";
import {CreatePostDtoType} from "./dto/create-post.dto";
import {PostId} from "./model/post-id";
import {PostsInterface} from "./model/post";
import {User} from "../user/model/user";
import {PostLowService} from "./post.low.service";
import { LikeLowService } from "./like/like.low.service";
import { BookmarkService } from "../bookmark/book-mark.service";
import {UserName} from "../user/model/user.username";
import {UserLowService} from "../user/user.low.service";

export class PostHighService {
    constructor(
        private postLowService: PostLowService,
        private likeService: LikeLowService,
        private bookmarkService: BookmarkService,
        private userLowService: UserLowService
    ) {}

    async createPost(dto: CreatePostDtoType, photos: Express.Multer.File[], loggedInUser: User) {
        // TODO: maybe some validations
        const photosPath: string[] = photos.map(
            x => 'https://collegegrammedia.darkube.app/mediacollegegram/' + x.key
        )
        return await this.postLowService.createPost({...dto, photos: photosPath, userId: loggedInUser.id});
    }

    async getPostById(postId: PostId, userId: UserId) {
        const post = await this.postLowService.getPostById(postId)
        if (!post) {
            throw new NotFoundError('Post');
        }
        return { ...post, isLiked: await this.likeService.isLiked({ userId: userId, postId: postId }), isBookmarked: await this.bookmarkService.isBookmarked(userId, postId) };
    }

    async getPostsByUserId(userId: UserId, limit: number, startTime: Date): Promise<PostsInterface> {
        const result = await this.postLowService.getPostsByUserId(userId, limit, startTime);
        return {
            posts: result.posts,
            nextOffset: result.nextOffset,
            hasMore: result.hasMore,
        }
    }

    async getPostsByUsername(username: UserName, limit: number, startTime: Date) {
        const user = await this.userLowService.getUserByUsername(username)
        const result = await this.postLowService.getPostsByUserId(user.id, limit, startTime);
        return {
            posts: result.posts,
            nextOffset: result.nextOffset,
            hasMore: result.hasMore,
        }
    }
 }