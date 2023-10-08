import {LikeRepository} from "./like.repository";
import {LikeDtoType} from "./dto/like.dto";
import {BadRequestError, NotFoundError} from "../../../utility/http-errors";
import {blockEventEmitter, likeEventEmitter} from "../../../utility/event-handling";
import {UserId} from "../../user/model/user.id";
import {UserLowService} from "../../user/user.low.service";
import {FollowLowService} from "../../follow/follow.low.service";
import {PostLowService} from "../post.low.service";
import {LikeLowService} from "./like.low.service";
import { BlockLowService } from "../../block/block.low.service";

export class LikeHighService {
    constructor(private likeLowService: LikeLowService, private postLowService: PostLowService, private userLowService: UserLowService, private followLowService: FollowLowService, private blocksService: BlockLowService) {
        blockEventEmitter.on("block", (x, y) => this.blockAction({blockerId: x, blockedId: y}))
    }

    async like(dto: LikeDtoType) {
        const post = await this.postLowService.getPostById(dto.postId);
        if (!post) {
            throw new NotFoundError('Post');
        }
        const postAuthorId = await this.postLowService.getAuthorById(dto.postId);
        if (postAuthorId === dto.userId) {
            throw new BadRequestError('You can not like your own post');
        }

        const checkBlock = await this.blocksService.checkIfUsersBlockedEachOther({ userId: dto.userId, blockedUserId: postAuthorId })
        if (checkBlock) {
            return {status : checkBlock}
        }
        const author = await this.userLowService.getUserById(postAuthorId);
        if (author.isPrivate) {
            const follow = await this.followLowService.getFollowRelation({
            followerId: dto.userId,
                followingId: author.id
            });
            if (!follow) {
                throw new BadRequestError('You can not like this post');
            }
        }
        const like = await this.likeLowService.isLiked(dto);
        if (like) {
            throw new BadRequestError('You have already liked this post');
        }
        const newLike = await this.likeLowService.create(dto);
        likeEventEmitter.emit('like', newLike.userId, newLike.postId);
        return {status: "liked"};
    }

    async unlike(dto: LikeDtoType) {
        const post = await this.postLowService.getPostById(dto.postId);
        if (!post) {
            throw new NotFoundError('Post');
        }
        const postAuthorId = await this.postLowService.getAuthorById(dto.postId);
        if (postAuthorId === dto.userId) {
            throw new BadRequestError('You can not unlike your own post');
        }
        const author = await this.userLowService.getUserById(postAuthorId);
        if (author.isPrivate) {
            const follow = await this.followLowService.getFollowRelation({
                followerId: dto.userId,
                followingId: author.id
            });
            if (!follow) {
                throw new BadRequestError('You can not unlike this post');
            }
        }
        const like = await this.likeLowService.isLiked(dto);
        if (!like) {
            throw new BadRequestError('You have not liked this post');
        }

        await this.likeLowService.delete(dto);
        return {status: "unliked"};
    }

    async blockAction(dto: { blockerId: UserId, blockedId: UserId }) {
        return await this.likeLowService.blockedUserLike(dto);
    }

}