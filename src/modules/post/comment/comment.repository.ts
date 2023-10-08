import { Repository, DataSource, LessThan } from "typeorm";
import { CommentEntity } from "./entity/comment.entity";
import {CommentInterface, CreateCommentInterface} from "./model/comment";
import { zodCommentDao } from "./dao/create-comment.dao";
import { PostEntity } from "../entity/post.entity";
import { UserId } from "../../user/model/user.id";
import { PostId } from "../model/post-id";
import { z } from "zod"
import { zodGetCommentDao } from "./dao/get-comment.dao";

export class CommentRepository {
    private commentRepo: Repository<CommentEntity>;

    constructor(private appDataSource: DataSource) {
        this.commentRepo = appDataSource.getRepository(CommentEntity);
    }

    async createComment(comment: CreateCommentInterface): Promise<CommentInterface> {
        return this.appDataSource.manager.transaction(async (manager) => {
            const savedComment = await this.commentRepo.save(comment);
            const postRepo = manager.getRepository(PostEntity);
            await postRepo.update(
                { id: comment.postId },
                { commentCount: () => "commentCount + 1" }
            );
            return zodCommentDao.parse(savedComment);
        });
    }

    async getComments(postId: PostId, limit: number, startTime: Date) {
        const [comments, count] = await this.commentRepo.findAndCount(
            {
                where: {
                    postId: postId,
                    createdAt: LessThan(startTime)
                },
                order: { createdAt: 'desc' },
                take: limit

            }
        )
        const resultComments = z.nullable(zodGetCommentDao).parse(comments)
        const hasMore = count > limit
        return { comments: resultComments, hasMore: hasMore }
    }

}