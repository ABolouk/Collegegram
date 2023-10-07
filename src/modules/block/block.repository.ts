import {DataSource, LessThan, Repository} from "typeorm";
import {BlockEntity} from "./entity/block.entity";
import {BlockInterface, UnblockRelationInterface, BlockRelationInterface} from "./model/block";
import {z} from "zod"
import {zodBlockDao, zodBlockRellDao} from "./dao/block.dao";
import {UserId} from "../user/model/user.id";
import {raw} from "express";
import {User} from "../user/model/user";
import {zodMyCollegeGramUserDao} from "../user/dao/user.dao";

export class BlockRepository {
    private blockRepo: Repository<BlockEntity>;

    constructor(appDataSource: DataSource) {
        this.blockRepo = appDataSource.getRepository(BlockEntity);
    }

    async createBlockRelation(blockInterface: BlockRelationInterface): Promise<BlockRelationInterface> {
        return this.blockRepo.save(blockInterface).then((x) => zodBlockRellDao.parse(x))
    }

    async findBlock(blockRelation: BlockRelationInterface): Promise<BlockInterface | null> {
        return this.blockRepo
            .findOneBy({userId: blockRelation.userId, blockedUserId: blockRelation.blockedUserId})
            .then((x) => z.nullable(zodBlockDao).parse(x))
    }

    async deleteBlockRelation(unblockRelation: UnblockRelationInterface) {
        return this.blockRepo.delete({
            userId: unblockRelation.userId, blockedUserId: unblockRelation.blockedUserId
        })
    }

    async  findBlockerUsers(id: UserId) {
        const blockerUsers = await this.blockRepo
            .find({select: {userId: true}, where: {blockedUserId: id}})
        return blockerUsers.map((x) => x.userId)
    }

    async findBlockedUsers(id: UserId) {
        const blockedUsers = await this.blockRepo.find(
            {select: {blockedUserId: true}, where: {userId: id}}
        )
        return blockedUsers.map((x) => x.blockedUserId)
    }

    async getBlockedUsersById(userId: UserId, limit: number, startTime: Date) {
        const [blockedUsers, count] = await this.blockRepo.findAndCount({
            select: {
                user: {
                    username: true,
                    avatar: true,
                    firstName: true,
                    lastName: true,
                }
            },
            relations: {
                user: true,
            },
            where: {
                userId: userId,
                createdAt: LessThan(startTime)
            },
            order: { createdAt: 'desc' },
            take: limit,
        })
        const nextOffset = blockedUsers.length > 0 ? blockedUsers[blockedUsers.length - 1].createdAt : new Date();
        const hasMore = count > limit;
        return {
            blockedUsers: blockedUsers.map(blockedUser => zodMyCollegeGramUserDao.parse(blockedUser.user)),
            nextOffset: nextOffset,
            hasMore: hasMore,
        }
    }
}