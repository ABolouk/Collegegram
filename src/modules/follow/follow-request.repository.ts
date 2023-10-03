import {DataSource, Repository} from "typeorm";
import {FollowRequestEntity} from "./entity/follow-request.entity";
import {createFollowRequest, followReqDao, followReqIdDao, FollowRequest} from "./model/follow.request";
import {zodFollowReqDao, zodFollowReqIdDao} from "./dao/follow.req.dao";
import {FollowReqStatus} from "./model/follow.req.status";
import status = FollowReqStatus.status;
import {FollowReqId} from "./model/follow.req.id";
import {z} from "zod";

export class followRequestRepository {
    private followRequestRepo: Repository<FollowRequestEntity>;

    constructor(appDataSource: DataSource) {
        this.followRequestRepo = appDataSource.getRepository(FollowRequestEntity);
    }

    async createFollowRequest(followRequest: createFollowRequest): Promise<followReqIdDao> {
        return this.followRequestRepo.save(followRequest).then((x) => zodFollowReqIdDao.parse(x));
    }

    async getFollowRequest(followRequest: FollowRequest): Promise<followReqDao | null> {
        return await this.followRequestRepo.findOneBy([{
                followerId: followRequest.followerUserId,
                followingId: followRequest.followingUserId
            }]
        ).then((x) => z.nullable(zodFollowReqDao).parse(x));
    }

    async updateFollowRequest(followReqId: FollowReqId, followReqStatus: FollowReqStatus.status) {
        await this.followRequestRepo.update({id: followReqId}, {status: followReqStatus});
        return {status: "updated"};
    }

    async deleteFollowRequest(followReqId: FollowReqId) {
        await this.followRequestRepo.delete({id: followReqId});
        return {status: "deleted"};
    }

}