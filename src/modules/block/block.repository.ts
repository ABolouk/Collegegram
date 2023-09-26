import { DataSource, Repository } from "typeorm";
import { BlockEntity } from "./entity/block.entity";
import { BlockInterface, UnblockRelationInterface, BlockRelationInterface} from "./model/block";
import { z } from "zod"
import { zodBlockDao } from "./dao/block.dao";
import { UserId } from "../user/model/user.id";

export class BlockRepository {
  private blockRepo: Repository<BlockEntity>;
  constructor(appDataSource: DataSource) {
    this.blockRepo = appDataSource.getRepository(BlockEntity);
  }

  createBlockRelation(blockInterface: BlockRelationInterface): Promise<BlockRelationInterface> {
    return this.blockRepo.save(blockInterface)
  }

  async findBlock(blockRelation: BlockRelationInterface): Promise<BlockInterface | null> {
    return this.blockRepo
      .findOneBy({ userId: blockRelation.userId, blockedUserId: blockRelation.blockedUserId })
      .then((x) => z.nullable(zodBlockDao).parse(x))
  }

  deleteBlockRelation(unblockRelation: UnblockRelationInterface) { 
    return this.blockRepo.delete({
      userId: unblockRelation.userId, blockedUserId: unblockRelation.blockedUserId
    })
  }

  async findBlockedUsers(blockedUserId: UserId){
    const blockedUsers = await this.blockRepo
      .find({ select: { userId: true}, where: { blockedUserId: blockedUserId } })
    return blockedUsers
  }


}