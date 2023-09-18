import { DataSource, Repository } from "typeorm";
import { FollowRequestEntity } from "./entity/follow-request.entity";
import { createFollowRequest, followReqIdDao } from "./model/follow.request";
import { zodFollowReqIdDao } from "./dao/follow.req.dao";

export class FollowRequestRepository {
    private followRequestRepo: Repository<FollowRequestEntity>;
    constructor(appDataSource: DataSource) {
        this.followRequestRepo = appDataSource.getRepository(FollowRequestEntity);
    }

    async createFollowRequest(followRequest: createFollowRequest): Promise<followReqIdDao> {
        return this.followRequestRepo.save(followRequest).then((x) => zodFollowReqIdDao.parse(x));
    }

}