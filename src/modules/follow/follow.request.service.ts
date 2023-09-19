import {createFollowRequest, FollowRequest} from "./model/follow.request";
import {FollowReqStatus} from "./model/follow.req.status";
import {BadRequestError, NotFoundError} from "../../utility/http-errors";
import {followRequestRepository} from "./follow-request.repository";
import {followService} from "./follow.service";

export class followRequestService {
    constructor(private followReqRepo: followRequestRepository, private followRellService: followService) {
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
        return this.followReqRepo.getFollowRequest(followRequest);
    }

    async followRequestAction(followRequest: FollowRequest, followReqStatus: FollowReqStatus.status) {
        const followReq = await this.getFollowRequest(followRequest);
        if (!followReq) {
            throw new NotFoundError("Request");
        }
        if (followReq.status === FollowReqStatus.status.pending) {
            if (followReqStatus === FollowReqStatus.status.accepted) {
                await this.followReqRepo.updateFollowRequest(followReq.id, followReqStatus);
                await this.followRellService.createFollowRelation({
                    interactionId: followReq.interactionId,
                    followerId: followReq.followerId,
                    followingId: followReq.followingId,
                })
                return {status: "followed"};
            }
            if (followReqStatus === FollowReqStatus.status.rejected) {
                await this.followReqRepo.updateFollowRequest(followReq.id, followReqStatus);
                return {status: "rejected"};
            }
            if (followReqStatus === FollowReqStatus.status.cancelled) {
                await this.followReqRepo.updateFollowRequest(followReq.id, followReqStatus);
                return {status: "cancelled"};
            }
        }
        return {status: "no action"};
    }
}