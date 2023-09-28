import {BadRequestError, NotFoundError} from "../../utility/http-errors";
import {UserId} from "../user/model/user.id";
import {CreatePostDto} from "./dto/create-post.dto";
import {PostId} from "./model/post-id";
import {PostRepository} from "./post.repository";
import {PostsInterface} from "./model/post";
import {User} from "../user/model/user";

export class PostService {
    constructor(private postRepository: PostRepository) {
    }

    async createPost(dto: CreatePostDto, photos: Express.Multer.File[], loggedInUser: User) {
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

    async getPostsByUserId(userId: UserId, limit: number, nextOffset: number): Promise<PostsInterface> {
        const posts = await this.postRepository.getPostsByUserId(userId, limit, nextOffset);
        console.log(posts)
        if (!posts || !posts.at(-1)) {
            return {
                posts: posts,
                nextOffset: 0,
            }
        }
        const date = posts.at(-1)?.createdAt
        return {
            posts: posts,
            nextOffset: date ? date.getTime() : 0,
        }
    }
}