import {DataSource, LessThan, Repository} from "typeorm";
import {FollowEntity} from "./entity/follow.entity";
import {Follow, createFollowRelation, followDao, followIdDao} from './model/follow';
import {zodFollowIdDao, zodFollowRellDao, zodFollowingsId} from "./dao/follow.dao";
import {z} from "zod";
import {UserId} from "../user/model/user.id";
import {UserEntity} from "../user/entity/user.entity";
import {zodMyCollegeGramUserDao} from "../user/dao/user.dao";


export class FollowRepository {
    private followRepo: Repository<FollowEntity>;

    constructor(private appDataSource: DataSource) {
        this.followRepo = appDataSource.getRepository(FollowEntity);
    }

    async createFollowRelation(followRelation: createFollowRelation): Promise<followIdDao> {
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
            return zodFollowIdDao.parse(newFollow);
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

    async getFollowersById(userId: UserId, limit: number, startTime: Date) {
        const [followers, count] = await this.followRepo.findAndCount({
            select: {
                follower: {
                    id: true,
                    username: true,
                    avatar: true,
                    firstName: true,
                    lastName: true,
                }
            },
            relations: {
                follower: true,
            },
            where: {
                followerId: userId,
                createdAt: LessThan(startTime)
            },
            order: { createdAt: 'desc' },
            take: limit,
        })
        const nextOffset = followers.length > 0 ? followers[followers.length - 1].createdAt : new Date();
        const hasMore = count > limit;
        return {
            followers: followers.map(follower => zodMyCollegeGramUserDao.parse(follower)),
            nextOffset: nextOffset,
            hasMore: hasMore,
        }
    }

    async getFollowingsById(userId: UserId, limit: number, startTime: Date) {
        const [followings, count] = await this.followRepo.findAndCount({
            select: {
                following: {
                    id: true,
                    username: true,
                    avatar: true,
                    firstName: true,
                    lastName: true,
                }
            },
            relations: {
                following: true,
            },
            where: {
                followerId: userId,
                createdAt: LessThan(startTime)
            },
            order: { createdAt: 'desc' },
            take: limit,
        })
        const nextOffset = followings.length > 0 ? followings[followings.length - 1].createdAt : new Date();
        const hasMore = count > limit;
        return {
            followings: followings.map(follower => zodMyCollegeGramUserDao.parse(follower)),
            nextOffset: nextOffset,
            hasMore: hasMore,
        }
    }
}