import {createFollowRequest, FollowRequest} from "./model/follow.request";
import {FollowReqStatus} from "./model/follow.req.status";
import {BadRequestError, NotFoundError} from "../../utility/http-errors";
import {followRequestRepository} from "./follow-request.repository";
import {followService} from "./follow.service";
import {FollowReqId} from "./model/follow.req.id";
import {FollowRequestEntity} from "./entity/follow-request.entity";

export class followRequestService {
    constructor(private followReqRepo: followRequestRepository) {
    }

    async createFollowRequest(followRequest: createFollowRequest) {
        const followReq = await this.getFollowRequest({
            followerUserId: followRequest.followerId,
            followingUserId: followRequest.followingId
        });
        if (followReq) {
            throw new BadRequestError("Request already exists");
        }
        return await this.followReqRepo.createFollowRequest(followRequest);
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

}