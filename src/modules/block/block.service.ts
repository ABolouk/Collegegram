import { NotFoundError } from "../../utility/http-errors";
import { USerInteractionService } from "../user-interaction/user-interaction.service";
import { UserId } from "../user/model/user.id";
import { UserService } from "../user/user.service";
import { BlockRepository } from "./block.repository";
import { BlockDtoType } from "./dto/block.dto";

export class BlockService {
  constructor(private blockRepo: BlockRepository, private userInteractionService: USerInteractionService, private userService: UserService) { }

  async block(dto: BlockDtoType) {
    const blockedUserId = await this.userService.getUserIdByUserName(dto.blockedUserName)

    if (!blockedUserId) {
      throw new NotFoundError("User")
    }
    const block = {
      userId: dto.userId,
      blockedUserId: blockedUserId
    }

    await this.blockRepo.block(block)
    const interaction = {
      userId1: dto.userId,
      userId2: blockedUserId
    }
    const userInteraction = await this.userInteractionService.getInteraction(interaction)
    if (userInteraction !== null) {
      await this.userInteractionService.deleteUserInteraction(userInteraction)
    }
  }

  async unblock(dto: BlockDtoType) {
    const blockedUserId = await this.userService.getUserIdByUserName(dto.blockedUserName)
    if (!blockedUserId) {
      throw new NotFoundError("User")
    }
    const deletedBlock = {
      userId: dto.userId,
      blockedUserId: blockedUserId
    }
    return this.blockRepo.findBlock(deletedBlock)
  }

  async filterBlockedUser <A> (
    blockedUser: [],
    fn: () => Promise<A>
  ) {
    
  }

  async getBlockedUsers(id: UserId) {
    const blockedUsers = await this.blockRepo.findBlockedUsers(id)
    return blockedUsers
  }

}