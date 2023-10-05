import {NotFoundError} from "../../utility/http-errors";
import {UserId} from "../user/model/user.id";
import {CreatePostDtoType} from "./dto/create-post.dto";
import {PostId} from "./model/post-id";
import {PostsInterface} from "./model/post";
import {User} from "../user/model/user";
import {PostLowService} from "./post.low.service";

export class PostHighService {
    constructor(private postLowService: PostLowService) {
    }

    async createPost(dto: CreatePostDtoType, photos: Express.Multer.File[], loggedInUser: User) {
        // TODO: maybe some validations
        const photosPath: string[] = photos.map(
            x => 'https://collegegrammedia.darkube.app/mediacollegegram/' + x.key
        )
        return await this.postLowService.createPost({...dto, photos: photosPath, userId: loggedInUser.id});
    }

    async getPostById(postId: PostId) {
        const post = await this.postLowService.getPostById(postId)
        if (!post) {
            throw new NotFoundError('Post');
        }
        return post;
    }

    async getPostsByUserId(userId: UserId, limit: number, startTime: Date): Promise<PostsInterface> {
        const posts = await this.postLowService.getPostsByUserId(userId, limit, startTime);
        const nextOffset = posts.length === 0 ? new Date() : posts[posts.length - 1].createdAt;
        const hasMore = await this.postLowService.userHasMorePosts(userId, nextOffset)
        return {
            posts: posts,
            nextOffset: nextOffset,
            hasMore: hasMore,
        }
    }

    async getPostsByUsersId(usersId: UserId[], limit: number, startTime: Date) {
        const result = await this.postLowService.getPostsByusersId(usersId, limit, startTime)
        const nextOffset = result.homePagePosts.length === 0 ? new Date() : result.homePagePosts[result.homePagePosts.length - 1].createdAt
        const hasMore = result.hasMore
        const homePagePosts = result.homePagePosts
        return {
            posts: homePagePosts,
            nextOffset: nextOffset,
            hasMore: hasMore,
        }
    }

 }