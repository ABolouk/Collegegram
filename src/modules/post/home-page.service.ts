import { PostService } from "./post.service";
import { UserService } from "../user/user.service";
import { homePageDtoType } from "./dto/home-page.dto";

export class HomePageService {
  constructor(private postService: PostService, private userService: UserService) { }
  
  

  async getHome(dto: homePageDtoType) {
    const followingUsersId = ["24e11db6-04d9-4f84-8835-aa78dd4e92d1"]
    const result = (await this.postService.getPostsByUsersId(followingUsersId, dto.limit, dto.startTime))
    const homePagePosts = await Promise.all(result.posts.map(async (x) => ({ id: x.id, familyName: await this.userService.getFamilyNameById(x.userId), tags: x.tags, photos: x.photos })))
    return {
      posts: homePagePosts,
      nextOffset: result.nextOffset,
      hasMore: result.hasMore,
    }
  }

}