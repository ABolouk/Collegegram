import { Repository, DataSource } from "typeorm";
import { CommentEntity } from "./entity/comment.entity";
import { CommentInterface } from "./model/comment";
import { zodCommentDao } from "./dao/create-comment.dao";

export class CommentRepository {
  private commentRepo: Repository<CommentEntity>;
  constructor(appDataSource: DataSource) {
    this.commentRepo = appDataSource.getRepository(CommentEntity);
  }

  async create(comment: CommentInterface): Promise<CommentInterface> {
    return this.commentRepo.save(comment).then((x) => zodCommentDao.parse(x))
    
  }

}