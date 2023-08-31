import { BadRequestError } from "../../utility/http-errors";
import { UserId, isUserId } from "../user/model/user.id";
import { CreatePostDto } from "./dto/create-post.dto";
import { PostId, isPostId } from "./model/post-id";
import { PostRepository } from "./post.repository";

export class PostService {
    constructor(private postRepository: PostRepository) {}

    createPost(dto: CreatePostDto) {
        // TODO: maybe some validations
        return this.postRepository.createPost(dto)
    }

    getPostById(postId: PostId) {
        if(!isPostId(postId)) {
            throw new BadRequestError('invalid postId');
        }
        return this.postRepository.getPostById(postId);
    }

    getPostsByUserId(userId: UserId) {
        if(!isUserId(userId)) {
            throw new BadRequestError('invalid userId');
        }
        return this.postRepository.getPostsByUserId(userId);
    }
}