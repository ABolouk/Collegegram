import {NotFoundError} from "../../../utility/http-errors";
import {PostHighService} from "../post.high.service";
import {CommentRepository} from "./comment.repository";
import {createCommentDto} from "./dto/create-comment.dto";
import {PostLowService} from "../post.low.service";


export class CommentService {
    constructor(
        private commentRepo: CommentRepository,
        private postLowService: PostLowService
    ) {
    }

    async comment(dto: createCommentDto) {
        const post = await this.postLowService.getPostById(dto.postId)

        if (!post) {
            throw new NotFoundError("Post");
        }

        const createdComment = {
            userId: dto.userId,
            postId: dto.postId,
            content: dto.content
        }

        return await this.commentRepo.create(createdComment)
    }
}