import {BlockRepository} from "./block.repository";
import {BlockInterface, BlockRelationInterface, UnblockRelationInterface} from "./model/block";
import {UserId} from "../user/model/user.id";

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

    async findBlockRellInTwoWay(blockRelation: BlockRelationInterface): Promise<BlockInterface | null> {
        return this.blockRepo.findBlockRellInTwoWay(blockRelation)
    }

}