import { BadRequestError, NotFoundError } from "../../../utility/http-errors";
import { PostHighService } from "../post.high.service";
import { CommentRepository } from "./comment.repository";
import { createCommentDto } from "./dto/create-comment.dto";
import { PostLowService } from "../post.low.service";
import { GetCommentDtoType } from "./dto/get-comment.dto";
import { UserLowService } from "../../user/user.low.service";
import { FollowLowService } from "../../follow/follow.low.service";

export class CommentService {
    constructor(
        private commentRepo: CommentRepository,
        private postLowService: PostLowService,
        private userLowService: UserLowService,
        private followLowService: FollowLowService
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

        return await this.commentRepo.createComment(createdComment)
    }

    async getComments(dto: GetCommentDtoType) {
        const post = await this.postLowService.getTotalPostById(dto.postId)
        if (!post) {
            throw new NotFoundError("Post")
        }
        const author = await this.userLowService.getUserById(post.userId)
        if (!author) {
            throw new NotFoundError("User")
        }
        if (author.isPrivate) {
            const follow = await this.followLowService.getFollowRelation({
                followerId: dto.userId,
                followingId: author.id
            });
            if (!follow) {
                throw new BadRequestError('شما نمی‌توانید نظرات این پست را ببینید.');
            }
        }
        const result = await this.commentRepo.getComments(dto.postId, dto.limit, dto.startTime)
        if (!result.comments) {
            return {
                comments: [],
                hasMore: false
            }
        }
        const resultComments = await Promise.all(result.comments.map(async (x) => ({ id: x.id, familyName: await this.userLowService.getFamilyNameById(x.userId), userName: (await this.userLowService.getUserById(x.userId)).username, postId: x.postId, content: x.content, createdAt: x.createdAt })))
        const nextOffset = result.comments.length === 0 ? new Date() : result.comments[result.comments.length - 1].createdAt;
        return {
            comments: resultComments,
            nextOffset: nextOffset,
            hasMore: result.hasMore,
        }

    }
}