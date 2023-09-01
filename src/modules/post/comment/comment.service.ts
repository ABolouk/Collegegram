import { NotFoundError } from "../../../utility/http-errors";
import { PostService } from "../post.service";
import { CommentRepository } from "./comment.repository";
import { CommentDao } from "./dao/create-comment.dao";
import { createCommentDto } from "./dto/create-comment.dto";


 export class CommentService{
  constructor(
    private commentRepo: CommentRepository,
    private postService: PostService
  ) { }
  
  async comment(dto: createCommentDto): Promise<CommentDao> {
    const post = await this.postService.getPostById(dto.postId)

    if (!post) {
      throw new NotFoundError("Post");
    }

    const createdComment = {
      autherId: post.userId,
      postId: dto.postId,
      content: dto.content
    }

    return await this.commentRepo.create(createdComment)
  }
}