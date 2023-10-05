import { PostHighService } from "./post.high.service";
import { UserHighService } from "../user/user.high.service";
import { homePageDtoType } from "./dto/home-page.dto";
import { FollowHighService } from "../follow/follow.high.service";
import {FollowLowService} from "../follow/follow.low.service";
import {UserLowService} from "../user/user.low.service";

export class HomePageService {
  constructor(private postService: PostHighService, private userLowService: UserLowService, private followLowService : FollowLowService) { }
  
  

  async getHome(dto: homePageDtoType) {
    const followingUsersId = await this.followLowService.getFollowingsIdByUserId(dto.userId)
    const listOfFollowingUsersId = followingUsersId.map((x) => x.followingId)
    const result = (await this.postService.getPostsByUsersId(listOfFollowingUsersId, dto.limit, dto.startTime))
    const posts = result.posts
    const homePagePosts = await Promise.all(posts.map(async (x) => ({ id: x.id, familyName: await this.userLowService.getFamilyNameById(x.userId), userName: (await this.userLowService.getUserById(x.userId)).username ,tags: x.tags, photos: x.photos })))
    return {
      posts: homePagePosts,
      nextOffset: result.nextOffset,
      hasMore: result.hasMore,
    }
  }
}