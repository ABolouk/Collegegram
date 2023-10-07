import {NotFoundError} from "../../utility/http-errors";
import {UserId} from "../user/model/user.id";
import {CreatePostDtoType} from "./dto/create-post.dto";
import {PostId} from "./model/post-id";
import {PostsInterface} from "./model/post";
import {User} from "../user/model/user";
import {PostLowService} from "./post.low.service";
import { LikeLowService } from "./like/like.low.service";
import { BookmarkService } from "../bookmark/book-mark.service";

export class PostHighService {
    constructor(private postLowService: PostLowService, private likeService: LikeLowService, private bookmarkService: BookmarkService) {
    }

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
        const posts = await this.postLowService.getPostsByUserId(userId, limit, startTime);
        const resultPosts = await Promise.all(posts.map(async (post) => ({ ...post, isLiked: await this.likeService.isLiked({ userId: userId, postId: post.id }), isBookmarked: await this.bookmarkService.isBookmarked(userId, post.id)})))
        const nextOffset = posts.length === 0 ? new Date() : posts[posts.length - 1].createdAt;
        const hasMore = await this.postLowService.userHasMorePosts(userId, nextOffset)
        return {
            posts: resultPosts,
            nextOffset: nextOffset,
            hasMore: hasMore,
        }
    }

 }