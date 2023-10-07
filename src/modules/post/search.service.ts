import { SearchDtoType } from "./dto/search.dto";
import { LikeLowService } from "./like/like.low.service";
import { PostId } from "./model/post-id";
import { PostLowService } from "./post.low.service";

export class SearchService{
  constructor(private postService: PostLowService, private likeService: LikeLowService, ) {
    
  }

  async search(dto: SearchDtoType) {
    const result = await this.postService.getPostsByTagTitle(dto.tag, dto.limit, dto.startTime)
    const posts = result.searchPosts
    const nextOffset = posts.length === 0 ? new Date() : posts[posts.length - 1].createdAt
    const searchPosts = await Promise.all(posts.map(async (x) => ({
      id: x.id, photosLen: x.photos.length, photos: x.photos, likeCount: x.likeCount, isLiked: await this.likeService.isLiked({ userId: dto.userId, postId: x.id as PostId }), createdAt: x.createdAt
    })))
    return {
      posts: searchPosts,
      nextOffset: nextOffset,
      hasMore: result.hasMore
    }

  }
}