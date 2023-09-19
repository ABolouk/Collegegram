import { DataSource, Repository } from "typeorm";
import { BlockEntity } from "./entity/block.entity";

export class BlockRepository {
  private blockRepo: Repository<BlockEntity>;
  constructor(appDataSource: DataSource) {
    this.blockRepo = appDataSource.getRepository(BlockEntity);
  }

  
}