import {Repository, DataSource, LessThan, In} from "typeorm";
import {CommentEntity} from "./entity/comment.entity";
import {CommentInterface} from "./model/comment";
import {zodCommentDao} from "./dao/create-comment.dao";
import {PostEntity} from "../entity/post.entity";
import {UserId} from "../../user/model/user.id";
import {PostId} from "../model/post-id";
import {z} from "zod"
import {zodGetCommentDao} from "./dao/get-comment.dao";
import {LikeEntity} from "../like/entity/like.entity";

export class CommentRepository {
    private commentRepo: Repository<CommentEntity>;

    constructor(private appDataSource: DataSource) {
        this.commentRepo = appDataSource.getRepository(CommentEntity);
    }

    async createComment(comment: CommentInterface): Promise<CommentInterface> {
        return this.appDataSource.manager.transaction(async (manager) => {
            const savedComment = await this.commentRepo.save(comment);
            const postRepo = manager.getRepository(PostEntity);
            await postRepo.update(
                {id: comment.postId},
                {commentCount: () => "commentCount + 1"}
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
                order: {createdAt: 'desc'},
                take: limit

            }
        )
        const resultComments = z.nullable(zodGetCommentDao).parse(comments)
        const hasMore = count > limit
        return {comments: resultComments, hasMore: hasMore}
    }

    async blockAction(blockerId: UserId, blockedId: UserId) {
        const comment = await this.commentRepo.find({
            select: {
                userId: true,
                postId: true,
                post: {
                    userId: true,
                },
            },
            relations: {
                post: true,
            },
            where: [{
                userId: blockedId,
                post: {
                    userId: blockerId,
                }
            }, {
                userId: blockerId,
                post: {
                    userId: blockedId,
                }
            },
            ],
        });
        await this.appDataSource.manager.transaction(async manager => {
            const postRepo = manager.getRepository(PostEntity);
            const likeRepo = manager.getRepository(CommentEntity);
            const newLike = await likeRepo.delete(
                {postId: In(comment.map(x => x.postId))}
            );
            await postRepo.update(
                {id: In(comment.map(x => x.postId))},
                {likeCount: () => "commentCount - 1"}
            );
        });
        return {status: "blocked"}
    }
}