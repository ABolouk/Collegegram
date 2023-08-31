import { Repository, DataSource } from "typeorm";
import { CommentEntity } from "./entity/comment.entity";
import { CreateCommentInterface } from "./model/comment";
import { CommentDao, createCommentDao, getCommentDao } from "./dao/create-comment.dao";
import { PostId } from "../model/post-id";


export class CommentRepository {
  private commentRepo: Repository<CommentEntity>;
  constructor(appDataSource: DataSource) {
    this.commentRepo = appDataSource.getRepository(CommentEntity);
  }

  async create(comment: CreateCommentInterface): Promise<CommentDao> {
    const savedComment = await this.commentRepo.save(comment)
    return createCommentDao(savedComment)
  }

  async findByPostId(id: PostId): Promise<CommentDao | null> {
    const outputComment = await this.commentRepo.findOneBy({id})
    return getCommentDao(outputComment)
  }
}