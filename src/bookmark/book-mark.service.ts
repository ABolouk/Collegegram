import { PostService } from "../modules/post/post.service";
import { UserService } from "../modules/user/user.service";
import { BadRequestError, NotFoundError } from "../utility/http-errors";
import { BookMarkDtoType } from "./dto/create-book-mark.dto";
import { followService } from "../modules/follow/follow.service";
import { BookmarkRepository } from "./book-mark.repository";

export class BookMarkService {

  constructor(private bookmarkRepo: BookmarkRepository, private postService: PostService, private userService: UserService, private followService: followService) { }


  async bookmark(dto: BookMarkDtoType) {
    const post = this.postService.getPostById(dto.postId)
    if (!post) {
      throw new NotFoundError('Post');
    }

    const author = await this.userService.getUserById(dto.userId);
    if (author.isPrivate) {
      const follow = await this.followService.getFollowRelation({
        followerId: dto.userId,
        followingId: author.id
      });
      if (!follow) {
        throw new BadRequestError('شما نمی‌توانید این پست را سیو کنید.');
      }
    }

    const bookmark = await this.bookmarkRepo.getBookmark({ userId: dto.userId, postId: dto.postId })
    if (bookmark !== null) {
      throw new BadRequestError("شما تاکنون این پست را سیو کرده‌اید")
    }
    await this.bookmarkRepo.createBookmark({ userId: dto.userId, postId: dto.postId })
    return { status: "bookmarked" }
  }

  async unBookmark(dto: BookMarkDtoType) {
    const post = this.postService.getPostById(dto.postId)
    if (!post) {
      throw new NotFoundError('Post');
    }

    const author = await this.userService.getUserById(dto.userId);
    if (author.isPrivate) {
      const follow = await this.followService.getFollowRelation({
        followerId: dto.userId,
        followingId: author.id
      });
      if (!follow) {
        throw new BadRequestError('شما نمی‌توانید این پست را آنسیو کنید.');
      }
    }

    const bookmark = await this.bookmarkRepo.getBookmark({ userId: dto.userId, postId: dto.postId })
    if (!bookmark) {
      throw new BadRequestError("شما این پست را سیو نکرده‌اید.")
    }

    await this.bookmarkRepo.deleteBookmark(bookmark)
    return { status: "unbookmarked" }

  }
}