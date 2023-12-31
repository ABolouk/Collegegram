import {BadRequestError, NotFoundError} from "../../utility/http-errors";
import {BookmarkDtoType} from "./dto/create-book-mark.dto";
import {BookmarkRepository} from "./book-mark.repository";
import { GetBookmarkDtoType } from "./dto/get-book-mark.dto";
import {PostLowService} from "../post/post.low.service";
import {UserLowService} from "../user/user.low.service";
import {FollowLowService} from "../follow/follow.low.service";
import { PostId } from "../post/model/post-id";
import { UserId } from "../user/model/user.id";
import { BlockLowService } from "../block/block.low.service";


export class BookmarkService {

    constructor(private bookmarkRepo: BookmarkRepository, private postLowService: PostLowService, private userLowService: UserLowService, private followLowService: FollowLowService, private blockService: BlockLowService) {
    }


    async bookmark(dto: BookmarkDtoType) {
        const post = await this.postLowService.getTotalPostById(dto.postId)
        if (!post) {
            throw new NotFoundError('Post');
        }
        const author = await this.userLowService.getUserById(post.userId);
        if (!author) {
            throw new NotFoundError("User")
        }
        const checkBlock = await this.blockService.checkIfUsersBlockedEachOther({ userId: dto.userId, blockedUserId: author.id })
        if (checkBlock) {
            return { status: checkBlock }
        }
        if (author.isPrivate) {
            const follow = await this.followLowService.getFollowRelation({
                followerId: dto.userId,
                followingId: author.id
            });
            if (!follow && author.id !== dto.userId) {
                throw new BadRequestError('شما نمی‌توانید این پست را سیو کنید.');
            }
        }

        const bookmark = await this.bookmarkRepo.getBookmark({userId: dto.userId, postId: dto.postId})
        if (bookmark) {
            throw new BadRequestError("شما تاکنون این پست را سیو کرده‌اید")
        }
        await this.bookmarkRepo.createBookmark({userId: dto.userId, postId: dto.postId})
        return {status: "bookmarked"}
    }

    async unBookmark(dto: BookmarkDtoType) {
        const post = await this.postLowService.getTotalPostById(dto.postId)
        if (!post) {
            throw new NotFoundError('Post');
        }
        const author = await this.userLowService.getUserById(post.userId);
        if (!author) {
            throw new NotFoundError("User")
        }
        if (author.isPrivate) {
            const follow = await this.followLowService.getFollowRelation({
                followerId: dto.userId,
                followingId: author.id
            });
            if (!follow) {
                throw new BadRequestError('شما نمی‌توانید این پست را آنسیو کنید.');
            }
        }

        const bookmark = await this.bookmarkRepo.getBookmark({userId: dto.userId, postId: dto.postId})
        if (!bookmark) {
            throw new BadRequestError("شما این پست را سیو نکرده‌اید.")
        }

        await this.bookmarkRepo.deleteBookmark(bookmark)
        return {status: "unbookmarked"}

    }


    async isBookmarked(userId: UserId, postId: PostId): Promise<boolean> {
        const bookmark = {
            userId: userId,
            postId: postId
        }
        const isBookmarked = await this.bookmarkRepo.isBookmarked(bookmark);
        if (!isBookmarked) {
            return false
        }
        return true
    }


    async getBookmarks(dto: GetBookmarkDtoType) {
        const result = await this.bookmarkRepo.getBookmarksByUserId(dto.userId, dto.limit, dto.startTime);
        if (!result.bookmarkPosts) {
            throw new NotFoundError("Post")
        }
        const bookmarkPosts = result.bookmarkPosts.map((x) => x.post)
        const nextOffset = bookmarkPosts.length === 0 ? new Date() : bookmarkPosts[bookmarkPosts.length - 1].createdAt;
        const hasMore = result.hasMore
        return {
            posts: bookmarkPosts,
            nextOffset: nextOffset,
            hasMore: hasMore,
        }

    }
}