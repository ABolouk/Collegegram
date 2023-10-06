import {PostLowService} from "./post.low.service";
import {UserLowService} from "../user/user.low.service";
import {FollowLowService} from "../follow/follow.low.service";
import {exploreDtoType} from "./dto/explore.dto";
import {BlockLowService} from "../block/block.low.service";
import {zodExploreUserDao} from "./dao/explore.dao";

export class ExploreService {
    constructor(private postLowService: PostLowService, private userLowService: UserLowService, private followLowService: FollowLowService, private blockLowService: BlockLowService) {
    }

    async getExplore(dto: exploreDtoType) {
        const blockedUsers = await this.blockLowService.findBlockedUsers(dto.userId)
        const blockerUsers = await this.blockLowService.findBlockerUsers(dto.userId)
        const userFollowing = await this.followLowService.getFollowingsIdByUserId(dto.userId)
        const result = await this.userLowService.getUsersNotFollowingAndNotBlocked(blockedUsers, blockerUsers, userFollowing, dto.limit, dto.startTime)
        const usersNotFollowingAndNotBlocked = result.users
        const hasMore = result.hasMore
        const nextOffset = usersNotFollowingAndNotBlocked.length > 0 ? usersNotFollowingAndNotBlocked[usersNotFollowingAndNotBlocked.length - 1].createdAt : new Date();
        const explorePage = []
        for (let i = 0; i < usersNotFollowingAndNotBlocked.length; i++) {
            const user = usersNotFollowingAndNotBlocked[i]
            const posts = await this.postLowService.getPostsForExploreByUserId(user.id, 4)
            explorePage.push(
                {
                    user: user
                },
                {
                    posts: posts
                }
            )
        }
        return {
            explorePage: explorePage,
            hasMore: hasMore,
            nextOffset: nextOffset
        }
    }
}