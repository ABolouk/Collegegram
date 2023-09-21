import { DataSource, Repository } from "typeorm";
import { BlockEntity } from "./entity/block.entity";
import { BlockInterface, CreateBlockInterface } from "./model/block";
import {z} from "zod"
import { zodBlockDao } from "./dao/block.dao";
import { UserId } from "../user/model/user.id";

export class BlockRepository {
  private blockRepo: Repository<BlockEntity>;
  constructor(appDataSource: DataSource) {
    this.blockRepo = appDataSource.getRepository(BlockEntity);
  }

  block(blockInterface: CreateBlockInterface): Promise<CreateBlockInterface> {
    return this.blockRepo.save(blockInterface)
  }

  async findBlock(blockInterface: CreateBlockInterface) : Promise<BlockInterface | null>{
    return this.blockRepo
      .findOneBy({ userId: blockInterface.userId, blockedUserId: blockInterface.blockedUserId })
      .then((x) => z.nullable(zodBlockDao).parse(x))
  }

  unblock(id: UserId) {
    return this.blockRepo.delete({
      id: id
    })
  }

  async findBlockedUsers(id: UserId) {
    const blockedUsers = await this.blockRepo
      .find({ where: [{ blockedUserId: id }], select: { userId: true } })
    return blockedUsers
  }


}