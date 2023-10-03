import {NotFoundError} from "../../utility/http-errors";
import {UserId} from "../user/model/user.id";
import {UserService} from "../user/user.service";
import {BlockRepository} from "./block.repository";
import {BlockDtoType} from "./dto/block.dto";
import {blockEventEmmmiter} from "../../data/event-handling";

export class BlockService {
    constructor(private blockRepo: BlockRepository, private userService: UserService) {
    }

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

        blockEventEmmmiter.emit("block", block.userId, block.blockedUserId)

        return { status: "Blocked" }

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

    async getBlockedUsers(id: UserId) {
        const blockedUsers = await this.blockRepo.findBlockedUsers(id)
        return blockedUsers
    }

}