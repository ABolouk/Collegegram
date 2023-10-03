import {Repository, DataSource} from "typeorm";
import {CommentEntity} from "./entity/comment.entity";
import {CommentInterface} from "./model/comment";
import {zodCommentDao} from "./dao/create-comment.dao";
import {PostEntity} from "../entity/post.entity";

export class CommentRepository {
    private commentRepo: Repository<CommentEntity>;

    constructor(private appDataSource: DataSource) {
        this.commentRepo = appDataSource.getRepository(CommentEntity);
    }

    async create(comment: CommentInterface): Promise<CommentInterface> {
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

}