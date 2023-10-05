import {BadRequestError} from "../../utility/http-errors";
import {UserId} from "../user/model/user.id";
import {UserService} from "../user/user.service";
import {BlockRepository} from "./block.repository";
import {blockEventEmmmiter} from "../../utility/event-handling";
import {BlockRelationInterface, UnblockRelationInterface} from "./model/block";

export class BlockService {
    constructor(private blockRepo: BlockRepository) {
    }

    async block(blockRell: BlockRelationInterface) {

        if (blockRell.userId === blockRell.blockedUserId) {
            throw new BadRequestError("شما نمی‌توانید خودتان را بلاک کنید.")
        }

        const blockRelation = await this.blockRepo.findBlock(blockRell)
        if (blockRelation) {
            throw new BadRequestError(".شما قبلا این کاربر را بلاک کرده‌اید.")
        }

        const newBlockRelation = await this.blockRepo.createBlockRelation(blockRell)


        blockEventEmmmiter.emit("block", newBlockRelation.userId, newBlockRelation.blockedUserId)
        return {status: "blocked"}
        //NOTE: follow userid: followingid, followerid
    }

    async unblock(unblock: UnblockRelationInterface) {

        if (unblock.userId === unblock.blockedUserId) {
            throw new BadRequestError("شما نمی‌توانید خودتان را آنبلاک کنید.")
        }

        const blockRelation = await this.blockRepo.findBlock(unblock)
        if (!blockRelation) {
            throw new BadRequestError(".شما قبلا این کاربر را بلاک نکرده‌اید.")
        }

        await this.blockRepo.deleteBlockRelation(blockRelation)
        return {status: "unblocked"}
    }


    async checkIfUsersBlockedEachOther(relation: BlockRelationInterface) {
        const blockRelation = await this.blockRepo.findBlock(relation)
        if (!blockRelation) {
            return false
        }
        return true
    }

    async getBlockerUsers(id: UserId) {
        const blockerUsers = await this.blockRepo.findBlockerUsers(id)
        return blockerUsers.map((x) => x.userId)
    }

}