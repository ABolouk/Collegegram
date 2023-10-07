import {createFollowRequest, FollowRequest} from "./model/follow.request";
import {FollowReqStatus} from "./model/follow.req.status";
import {BadRequestError, NotFoundError} from "../../utility/http-errors";
import {followRequestRepository} from "./follow-request.repository";
import {FollowHighService} from "./follow.high.service";
import {FollowReqId} from "./model/follow.req.id";
import {FollowRequestEntity} from "./entity/follow-request.entity";
import {blockEventEmmmiter} from "../../data/event-handling";
import {UserId} from "../user/model/user.id";

export class FollowRequestLowService {
    constructor(private followReqRepo: followRequestRepository) {
        blockEventEmmmiter.on("block", (x, y) => this.blockAction({blockerId: x, blockedId: y}))
    }

    async createFollowRequest(followRequest: createFollowRequest) {
        const followReq = await this.getFollowRequest({
            followerUserId: followRequest.followerId,
            followingUserId: followRequest.followingId
        });
        if (followReq) {
            throw new BadRequestError("Request already exists");
        }
        await this.followReqRepo.createFollowRequest(followRequest);
        return {status: "pending"};
    }

    async getFollowRequest(followRequest: FollowRequest) {
        return await this.followReqRepo.getFollowRequest(followRequest);
    }

    async updateFollowRequest(followReqId: FollowReqId, followReqStatus: FollowReqStatus.status) {
        await this.followReqRepo.updateFollowRequest(followReqId, followReqStatus);
        return {status: "updated"};
    }

    async deleteFollowRequest(followRequest: FollowRequestEntity[]) {
        if (!followRequest) {
            throw new NotFoundError("Request");
        }
        await this.followReqRepo.deleteFollowRequest(followRequest);
        return {status: "deleted"};
    }

    async getFollowRequestInTwoWay(followRequest: FollowRequest) {
        return await this.followReqRepo.getFollowRequestInTwoWay(followRequest);
    }

    async blockAction(block: { blockerId: UserId, blockedId: UserId }) {
        return await this.followReqRepo.blockAction(block.blockerId, block.blockedId);
    }

}