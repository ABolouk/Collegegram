import {NotFoundError} from "../../../utility/http-errors";
import {PostService} from "../post.service";
import {CommentRepository} from "./comment.repository";
import {createCommentDto} from "./dto/create-comment.dto";
import {commentEventEmmmiter} from "../../../data/event-handling";


export class CommentService {
    constructor(
        private commentRepo: CommentRepository,
        private postService: PostService
    ) {
    }

    async comment(dto: createCommentDto) {
        const post = await this.postService.getPostById(dto.postId)

        if (!post) {
            throw new NotFoundError("Post");
        }

        const createdComment = {
            userId: dto.userId,
            postId: dto.postId,
            content: dto.content
        }

        const newComment = await this.commentRepo.create(createdComment)
        commentEventEmmmiter.emit("comment", newComment.userId, newComment.postId)
        return newComment
    }
}