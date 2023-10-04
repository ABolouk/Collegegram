import {NotFoundError} from "../../utility/http-errors";
import {UserId} from "../user/model/user.id";
import {CreatePostDtoType} from "./dto/create-post.dto";
import {PostId} from "./model/post-id";
import {PostRepository} from "./post.repository";
import {PostsInterface} from "./model/post";
import {User} from "../user/model/user";

export class PostService {
    constructor(private postRepository: PostRepository) {
    }

    async createPost(dto: CreatePostDtoType, photos: Express.Multer.File[], loggedInUser: User) {
        // TODO: maybe some validations
        const photosPath: string[] = photos.map(
            x => 'https://collegegrammedia.darkube.app/mediacollegegram/' + x.key
        )
        return await this.postRepository.createPost({...dto, photos: photosPath, userId: loggedInUser.id});
    }

    async getPostById(postId: PostId) {
        const post = await this.postRepository.getPostById(postId)
        if (!post) {
            throw new NotFoundError('Post');
        }
        return post;
    }

    async getPostsByUserId(userId: UserId, limit: number, startTime: Date): Promise<PostsInterface> {
        const posts = await this.postRepository.getPostsByUserId(userId, limit, startTime);
        const nextOffset = posts.length === 0 ? new Date() : posts[posts.length - 1].createdAt;
        const hasMore = await this.postRepository.userHasMorePosts(userId, nextOffset)
        return {
            posts: posts,
            nextOffset: nextOffset,
            hasMore: hasMore,
        }
    }

    async getPostsByUsersId(usersId: UserId[], limit: number, startTime: Date) {
        const result = await this.postRepository.getPostsByusersId(usersId, limit, startTime)
        const nextOffset = result.homePagePosts.length === 0 ? new Date() : result.homePagePosts[result.homePagePosts.length - 1].createdAt
        const hasMore = result.hasMore
        const homePagePosts = result.homePagePosts
        return {
            posts: homePagePosts,
            nextOffset: nextOffset,
            hasMore: hasMore,
        }
    }

    async getAuthorById(postId: PostId) {
        const author = await this.postRepository.getAuthorById(postId)
        if (!author) {
            throw new NotFoundError('User');
        }
        return author;
    }

}