import { promises } from "dns";
import { BadRequestError, NotFoundError } from "../../utility/http-errors";
import { UserId, isUserId } from "../user/model/user.id";
import { CommentRepository } from "./comment/comment.repository";
import { createCommentDto } from "./comment/dto/create-comment.dto";
import { CreateCommentInterface } from "./comment/model/comment";
import { CreatePostDto } from "./dto/create-post.dto";
import { PostId, isPostId } from "./model/post-id";
import { PostRepository } from "./post.repository";
import { CommentDao } from "./comment/dao/create-comment.dao";

export class PostService {
  constructor(private postRepository: PostRepository,
  private commentRepository: CommentRepository
  ) { }

  createPost(dto: CreatePostDto) {
    // TODO: maybe some validations
   // return this.postRepository.createPost(dto)
  }

  getPostById(postId: PostId) {
    if (!isPostId(postId)) {
      throw new BadRequestError('invalid postId');
    }
    return this.postRepository.getPostById(postId);
  }

  getPostsByUserId(userId: UserId) {
    if (!isUserId(userId)) {
      throw new BadRequestError('invalid userId');
    }
    return this.postRepository.getPostsByUserId(userId);
  }

  async createComment(dto: createCommentDto): Promise<CommentDao> {
    const post = await this.postRepository.getPostById(dto.postId)

    if (!post) {
      throw new NotFoundError("Post");
    }

    const createdComment = {
      autherId: post.userId,
      postId: dto.postId,
      content: dto.content
    }

    return await this.commentRepository.create(createdComment)

  }

  async getCommentsWithPostId(id: PostId){ // ????
    const post = await this.postRepository.getPostById(id)
    const comments = post?.comments
    return comments
  }
}