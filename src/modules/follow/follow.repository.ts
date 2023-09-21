import {DataSource, Repository} from "typeorm";
import {FollowEntity} from "./entity/follow.entity";
import {Follow, createFollowRelation, followDao, followIdDao} from './model/follow';
import {zodFollowIdDao, zodFollowRellDao} from "./dao/follow.dao";
import {z} from "zod";


export class FollowRepository {
    private followRepo: Repository<FollowEntity>;

    constructor(appDataSource: DataSource) {
        this.followRepo = appDataSource.getRepository(FollowEntity);
    }

    async createFollowRelation(followRelation: createFollowRelation): Promise<followIdDao> {
        return this.followRepo.save(followRelation).then((x) => zodFollowIdDao.parse(x));
    }

    async getFollowRelation(followRelation: Follow): Promise<followDao | null> {
        return this.followRepo.findOneBy({
            followerId: followRelation.followerId,
            followingId: followRelation.followingId,
        }).then((x) => z.nullable(zodFollowRellDao).parse(x));
    }

    async deleteFollowRelation(followRelation: Follow) {
        await this.followRepo.delete({followerId: followRelation.followerId, followingId: followRelation.followingId})
    }
}