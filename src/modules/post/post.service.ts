import { BadRequestError, NotFoundError, UnauthorizedError } from "../../utility/http-errors";
import { UserId, isUserId } from "../user/model/user.id";
import { UserRepository } from "../user/user.repository";
import { CreatePostDto } from "./dto/create-post.dto";
import { PostId, isPostId } from "./model/post-id";
import { PostRepository } from "./post.repository";

export class PostService {
    constructor(private postRepository: PostRepository, private userRepository: UserRepository) { }

    async createPost(dto: CreatePostDto) {
        // TODO: maybe some validations
        // TODO: also how to save images
        return await this.postRepository.createPost(dto);
    }

    async getPostById(postId: PostId) {
        if (!isPostId(postId)) {
            throw new BadRequestError('invalid postId');
        }
        const post = await this.postRepository.getPostById(postId)
        if (!post) {
            throw new NotFoundError('Post');
        }
        return post;
    }

    async getPostsByUserId(userId: UserId, perPage: number, pageNumber: number) {
        if (!isUserId(userId)) {
            throw new BadRequestError('invalid userId');
        }
        const user = await this.userRepository.findById(userId);
        if (!user) {
            throw new UnauthorizedError()
        }
        return await this.postRepository.getPostsByUserId(userId, perPage, pageNumber);
    }
}