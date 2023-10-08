import {BlockRepository} from "./block.repository";
import { BlockInterface, BlockRelationInterface, UnblockRelationInterface, BlockStatus } from "./model/block";
import { UserId } from "../user/model/user.id";

export class BlockLowService {
    constructor(private blockRepo: BlockRepository) {
    }

    async findBlock(blockRelation: BlockRelationInterface): Promise<BlockInterface | null> {
        return this.blockRepo.findBlock(blockRelation)
    }

    async createBlockRelation(blockInterface: BlockRelationInterface): Promise<BlockRelationInterface> {
        return this.blockRepo.createBlockRelation(blockInterface)
    }

    async deleteBlockRelation(unblockRelation: UnblockRelationInterface) {
        return this.blockRepo.deleteBlockRelation(unblockRelation)
    }

    async findBlockerUsers(id: UserId) {
        return this.blockRepo.findBlockerUsers(id)
    }

    async findBlockedUsers(userId: UserId) {
        return this.blockRepo.findBlockedUsers(userId)
    }

    async checkIfUsersBlockedEachOther(relation: BlockRelationInterface) {
        const blockRelation1 = await this.blockRepo.findBlock({userId: relation.userId, blockedUserId: relation.blockedUserId})
        if (blockRelation1) {
            const status: BlockStatus = "isBlocked"
            return status
        }
        const blockRelation2 = await this.blockRepo.findBlock({ userId: relation.blockedUserId, blockedUserId: relation.userId })
        if (blockRelation2) {
            const status: BlockStatus = "youAreBlocked"
            return status
        }
        return false
    }

    async getBlockedUsersById(userId: UserId, limit: number, startTime: Date) {
        return this.blockRepo.getBlockedUsersById(userId, limit, startTime);
    }
}