import { BlockRepository } from "./block.repository";
import { BlockDtoType } from "./dto/block.dto";

export class BlockService{
  constructor(private blockRepo: BlockRepository) { }
  
  block(dto: BlockDtoType) {
    
  }
}