import {DataSource, Repository} from "typeorm";
import {BlockEntity} from "./entity/block.entity";
import {BlockInterface, UnblockRelationInterface, BlockRelationInterface} from "./model/block";
import {z} from "zod"
import {zodBlockDao, zodBlockRellDao} from "./dao/block.dao";
import {UserId} from "../user/model/user.id";

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

    async findBlockerUsers(id: UserId) {
        const blockerUsers = await this.blockRepo
            .find({select: {userId: true}, where: {blockedUserId: id}})
        return blockerUsers
    }

    async findBlockRellInTwoWay(blockRelation: BlockRelationInterface): Promise<BlockInterface | null> {
        return this.blockRepo
            .findOneBy([
                {userId: blockRelation.blockedUserId, blockedUserId: blockRelation.userId},
                {userId: blockRelation.userId, blockedUserId: blockRelation.blockedUserId}
            ])
            .then((x) => z.nullable(zodBlockDao).parse(x))
    }


}