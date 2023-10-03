import { PostService } from "./post.service";
import { UserService } from "../user/user.service";
import { homePageDtoType } from "./dto/home-page.dto";
import { followService } from "../follow/follow.service";

export class HomePageService {
  constructor(private postService: PostService, private userService: UserService, private followService : followService) { }
  
  

  async getHome(dto: homePageDtoType) {
    const followingUsersId = await this.followService.getFollowingsIdByUserId(dto.userId)
    const listOffollowingUsersId = await Promise.all(followingUsersId.map((x) => x.followingId))
    const result = (await this.postService.getPostsByUsersId(listOffollowingUsersId, dto.limit, dto.startTime))
    const posts = result.posts
    const homePagePosts = await Promise.all(posts.map(async (x) => ({ id: x.id, familyName: await this.userService.getFamilyNameById(x.userId), tags: x.tags, photos: x.photos })))
    return {
      posts: homePagePosts,
      nextOffset: result.nextOffset,
      hasMore: result.hasMore,
    }
  }

}