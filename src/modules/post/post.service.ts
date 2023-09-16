import { NotFoundError } from "../../utility/http-errors";
import { UserId } from "../user/model/user.id";
import { CreatePostDto } from "./dto/create-post.dto";
import { PostId } from "./model/post-id";
import { PostRepository } from "./post.repository";

export class PostService {
    constructor(private postRepository: PostRepository) { }

    async createPost(dto: CreatePostDto, photos: Express.Multer.File[]) {
        // TODO: maybe some validations
        const photosPath: string[] = photos.length !== 0 ? photos.map(x => x.path) : []
        return await this.postRepository.createPost({ ...dto, photos: photosPath });
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