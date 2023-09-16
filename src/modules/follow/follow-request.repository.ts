import { DataSource, Repository } from "typeorm";
import { FollowRequestEntity } from "./entity/follow-request.entity";
import { createFollowRequest, followReqDao } from "./model/follow.request";
import { zodFollowReqDao } from "./dao/follow.req.dao";

export class FollowRequestRepository {
    private followRequestRepo: Repository<FollowRequestEntity>;
    constructor(appDataSource: DataSource) {
        this.followRequestRepo = appDataSource.getRepository(FollowRequestEntity);
    }

    async createFollowRequest(followRequest: createFollowRequest): Promise<followReqDao> {
        return this.followRequestRepo.save(followRequest).then((x) => zodFollowReqDao.parse(x));
    }

}