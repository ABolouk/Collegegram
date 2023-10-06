import { PostHighService } from "./post.high.service";
import { homePageDtoType } from "./dto/home-page.dto";
import { FollowLowService } from "../follow/follow.low.service";
import { UserLowService } from "../user/user.low.service";
import { LikeLowService } from "./like/like.low.service";
import { BookmarkService } from "../bookmark/book-mark.service";

export class HomePageService {
  constructor(private postService: PostHighService, private userLowService: UserLowService, private followLowService: FollowLowService, private likeService: LikeLowService, private bookmarkService: BookmarkService) { }



  async getHome(dto: homePageDtoType) {
    const followingUsersId = await this.followLowService.getFollowingsIdByUserId(dto.userId)
    const listOfFollowingUsersId = followingUsersId.map((x) => x.followingId)
    const result = (await this.postService.getPostsByUsersId(listOfFollowingUsersId, dto.limit, dto.startTime))
    const posts = result.posts
    const homePagePosts = await Promise.all(posts
      .map(async (x) => ({
        id: x.id, familyName: await this.userLowService.getFamilyNameById(x.userId), userName: (await this.userLowService.getUserById(x.userId)).username, tags: x.tags, photos: x.photos, isLiked: await this.likeService.isLiked({ userId: dto.userId, postId: x.id }), isBookmarked: await this.bookmarkService.isBookmarked(dto.userId, x.id),
        likeCount: x.likeCount, bookmarkCount: x.bookmarkCount, commentCount: x.commentCount
      })))
    return {
      posts: homePagePosts,
      nextOffset: result.nextOffset,
      hasMore: result.hasMore,
    }
  }
}