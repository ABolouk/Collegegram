import { DataSource, Repository } from "typeorm";
import { FollowEntity } from "./entity/follow.entity";
import { createFollowRelation } from './model/follow';

export class FollowRepository {
    private followRepo: Repository<FollowEntity>;
    constructor(appDataSource: DataSource) {
        this.followRepo = appDataSource.getRepository(FollowEntity);
    }

    createFollowRelation(followRelation: createFollowRelation) {
        return this.followRepo.save(followRelation)
    }

}