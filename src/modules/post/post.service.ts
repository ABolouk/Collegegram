import { NotFoundError } from "../../utility/http-errors";
import { UserId } from "../user/model/user.id";
import { CreatePostDto } from "./dto/create-post.dto";
import { PostId } from "./model/post-id";
import { PostRepository } from "./post.repository";

export class PostService {
    constructor(private postRepository: PostRepository) { }

    async createPost(dto: CreatePostDto) {
        // TODO: maybe some validations
        // TODO: also how to save images
        return await this.postRepository.createPost(dto);
    }

    async getPostById(postId: PostId) {
        const post = await this.postRepository.getPostById(postId)
        if (!post) {
            throw new NotFoundError('Post');
        }
        return post;
    }

    async getPostsByUserId(userId: UserId, limit: number, page: number) {
        return await this.postRepository.getPostsByUserId(userId, limit, page);
    }
}