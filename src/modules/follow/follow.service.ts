import {FollowRepository} from "./follow.repository";
import {Follow} from "./model/follow";
import {BadRequestError, ConflictError, NotFoundError} from "../../utility/http-errors";
import {followDtoType} from "./dto/follow.dto";
import {UserService} from "../user/user.service";
import {followRequestService} from "./follow.request.service";
import {FollowReqStatus} from "./model/follow.req.status";
import {FollowRequest} from "./model/follow.request";
import {unfollowDtoType} from "./dto/unfollow.dto";
import {acceptFollowReqType} from "./dto/followreq.accept.dto";
import {rejectFollowReqType} from "./dto/followreq.reject.dto";
import {cancellFollowReqType} from "./dto/followreq.cancel.dto";
import {UserId} from "../user/model/user.id";
import {blockEventEmmmiter} from "../../data/event-handling";

export class followService {
    constructor(private followRepo: FollowRepository, private followRequestService: followRequestService, private userService: UserService) {
        //TODO: Handle Events
        blockEventEmmmiter.on("block", async (blockerId: UserId, blockedId: UserId) => {
            await this.blockAction({blockerId, blockedId});
        })
    }

    async getFollowRelation(followRelation: Follow) {
        return await this.followRepo.getFollowRelation(followRelation);
    }

    async createFollowRelation(dto: followDtoType) {
        //TODO: BLOCK CHECK
        const followingUser = await this.userService.getUserByUsername(dto.following);
        if (!followingUser) {
            throw new NotFoundError("User")
        }
        if (followingUser.id === dto.follower) {
            throw new BadRequestError("Can't follow yourself")
        }
        const followRelation = await this.followRepo.getFollowRelation({
            followerId: dto.follower,
            followingId: followingUser.id
        });
        if (followRelation) {
            throw new ConflictError("Follow relation");
        }
        if (followingUser.isPrivate) {
            const followRequest = await this.followRequestService.getFollowRequest({
                followerUserId: dto.follower,
                followingUserId: followingUser.id
            });
            if (followRequest) {
                throw new ConflictError("Follow request already exists");
            }
            return await this.followRequestService.createFollowRequest({
                followerId: dto.follower,
                followingId: followingUser.id,
                status: FollowReqStatus.status.pending
            })
        }
        await this.followRepo.createFollowRelation({
            followerId: dto.follower,
            followingId: followingUser.id
        });
        return {status: "followed"};
    }

    async unfollow(dto: unfollowDtoType) {
        const followingUser = await this.userService.getUserById(dto.follower);
        if (!followingUser) {
            throw new NotFoundError("User")
        }
        const res = (await this.followRepo.getFollowRelation({
            followerId: dto.follower,
            followingId: followingUser.id
        }))
        if (!res) {
            throw new ConflictError("You are not following this user")
        }
        return this.followRepo.deleteFollowRelation({followerId: dto.follower, followingId: followingUser.id})
    }

    async acceptFollowRequest(dto: acceptFollowReqType) {
        const followerUser = await this.userService.getUserByUsername(dto.follower);
        if (!followerUser) {
            throw new NotFoundError("User")
        }
        return await this.followRequestAction({
            followerUserId: followerUser.id,
            followingUserId: dto.following
        }, FollowReqStatus.status.accepted)
    }

    async rejectFollowRequest(dto: rejectFollowReqType) {
        const followerUser = await this.userService.getUserByUsername(dto.follower);
        if (!followerUser) {
            throw new NotFoundError("User")
        }
        return await this.followRequestAction({
            followerUserId: followerUser.id,
            followingUserId: dto.following
        }, FollowReqStatus.status.rejected)
    }

    async cancelFollowRequest(dto: cancellFollowReqType) {
        const followingUser = await this.userService.getUserById(dto.follower);
        if (!followingUser) {
            throw new NotFoundError("User")
        }
        return await this.followRequestAction({
            followerUserId: dto.follower,
            followingUserId: followingUser.id
        }, FollowReqStatus.status.cancelled)
    }

    async followRequestAction(followRequest: FollowRequest, followReqStatus: FollowReqStatus.status) {
        const followReq = await this.followRequestService.getFollowRequest(followRequest);
        if (!followReq) {
            throw new NotFoundError("Request");
        }
        if (followReq.status === FollowReqStatus.status.pending) {
            if (followReqStatus === FollowReqStatus.status.accepted) {
                await this.followRequestService.updateFollowRequest(followReq.id, followReqStatus);
                await this.followRepo.createFollowRelation({
                    followerId: followReq.followerId,
                    followingId: followReq.followingId,
                })
                return {status: "followed"};
            }
            if (followReqStatus === FollowReqStatus.status.rejected) {
                await this.followRequestService.updateFollowRequest(followReq.id, followReqStatus);
                return {status: "rejected"};
            }
            if (followReqStatus === FollowReqStatus.status.cancelled) {
                await this.followRequestService.updateFollowRequest(followReq.id, followReqStatus);
                return {status: "cancelled"};
            }
        }
        return {status: "no action"};
    }

    async blockAction(dto: { blockerId: UserId, blockedId: UserId }) {
        const followRelation = await this.followRepo.getFollowRelInTwoWay({
            followerId: dto.blockerId,
            followingId: dto.blockedId
        });
        if (followRelation) {
            await this.followRepo.deleteFollowRelation({
                followerId: dto.blockerId,
                followingId: dto.blockedId
            })
        }
        const followRequest = await this.followRequestService.getFollowRequestInTwoWay({
            followerUserId: dto.blockerId,
            followingUserId: dto.blockedId
        });
        if (followRequest) {
            await this.followRequestService.deleteFollowRequest(followRequest)
        }
        return {status: "blocked"};
    }

}