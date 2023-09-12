import { DataSource, Repository } from "typeorm";
import { FollowRequestEntity } from "./entity/follow-request.entity";
import { FollowRequest, createFollowRequest } from "./model/follow-request";

export class FollowRequestRepository {
    private followRequestRepo: Repository<FollowRequestEntity>;
    constructor(appDataSource: DataSource) {
        this.followRequestRepo = appDataSource.getRepository(FollowRequestEntity);
    }

    createFollowRequest(followRequest: createFollowRequest) {
        return this.followRequestRepo.save(followRequest)
    }

}