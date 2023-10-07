import {DataSource, Repository} from "typeorm";
import {FollowEntity} from "./entity/follow.entity";
import {Follow, createFollowRelation, followDao, followIdDao} from './model/follow';
import {zodFollowRellDao, zodFollowingsId} from "./dao/follow.dao";
import {z} from "zod";
import {UserId} from "../user/model/user.id";
import {UserEntity} from "../user/entity/user.entity";


export class FollowRepository {
    private followRepo: Repository<FollowEntity>;

    constructor(private appDataSource: DataSource) {
        this.followRepo = appDataSource.getRepository(FollowEntity);
    }

    async createFollowRelation(followRelation: createFollowRelation): Promise<followDao> {
        return await this.appDataSource.manager.transaction(async manager => {
            const userRepo = manager.getRepository(UserEntity);
            const followRepo = manager.getRepository(FollowEntity);
            const newFollow = await followRepo.save({
                followerId: followRelation.followerId,
                followingId: followRelation.followingId
            });
            await userRepo.update(
                {id: newFollow.followerId},
                {followingCount: () => "followingCount + 1"}
            );
            await userRepo.update(
                {id: newFollow.followingId},
                {followerCount: () => "followerCount + 1"}
            );
            return zodFollowRellDao.parse(newFollow);
        });
    }

    async getFollowRelation(followRelation: Follow): Promise<followDao | null> {
        return this.followRepo.findOneBy({
            followerId: followRelation.followerId,
            followingId: followRelation.followingId,
        }).then((x) => z.nullable(zodFollowRellDao).parse(x));
    }

    async getFollowRelInTwoWay(followRelation: Follow): Promise<followDao[] | null> {
        return this.followRepo.find(
            {
                where: [
                    {
                        followerId: followRelation.followerId,
                        followingId: followRelation.followingId,
                    }
                    ,
                    {
                        followerId: followRelation.followingId,
                        followingId: followRelation.followerId,
                    }
                ]
            }
        ).then((x) => z.array(zodFollowRellDao).parse(x));
    }

    async deleteFollowRelation(followRelation: Follow) {
        await this.appDataSource.manager.transaction(async manager => {
            const userRepo = manager.getRepository(UserEntity);
            const followRepo = manager.getRepository(FollowEntity);
            const deleteFollow = await followRepo.delete({
                followerId: followRelation.followerId,
                followingId: followRelation.followingId
            });
            await userRepo.update(
                {id: followRelation.followerId},
                {followingCount: () => "followingCount - 1"}
            );
            await userRepo.update(
                {id: followRelation.followingId},
                {followerCount: () => "followerCount - 1"}
            );
        });
    }

    async getFollowingsIdByUserId(userId: UserId) {
        return this.followRepo.find({
            select: {
                followingId: true
            },
            where: {
                followerId: userId
            }
        }).then((x) => zodFollowingsId.parse(x))
    }
}