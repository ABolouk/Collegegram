import { PostService } from "../post/post.service";
import { UserService } from "../user/user.service";
import { BadRequestError, NotFoundError } from "../../utility/http-errors";
import { BookMarkDtoType } from "./dto/create-book-mark.dto";
import { followService } from "../follow/follow.service";
import { BookmarkRepository } from "./book-mark.repository";
import { GetBookMarkDtoType } from "./dto/get-book-mark.dto";


export class BookmarkService {

  constructor(private bookmarkRepo: BookmarkRepository, private postService: PostService, private userService: UserService, private followService: followService) { }


  async bookmark(dto: BookMarkDtoType) {
    const post = await this.postService.getPostById(dto.postId)
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
    const post = await this.postService.getPostById(dto.postId)
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

  async getBookmarks(dto: GetBookMarkDtoType) {
    const result = await this.bookmarkRepo.getBookmarksByUserId(dto.userId, dto.limit, dto.startTime);
    if (!result.bookmarkPosts) {
      throw new NotFoundError("Post")
    }
    const bookmarkPosts = result.bookmarkPosts
    const nextOffset = bookmarkPosts.length === 0 ? new Date() : bookmarkPosts[bookmarkPosts.length - 1].createdAt;
    const hasMore = result.hasMore
    return {
      posts: bookmarkPosts,
      nextOffset: nextOffset,
      hasMore: hasMore,
    }

  }
}