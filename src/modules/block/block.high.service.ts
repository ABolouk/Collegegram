import {BadRequestError, NotFoundError} from "../../utility/http-errors";
import {UserId} from "../user/model/user.id";
import {blockEventEmmmiter} from "../../utility/event-handling";
import {BlockRelationInterface, UnblockRelationInterface} from "./model/block";
import {BlockLowService} from "./block.low.service";
import {BlockDtoType} from "./dto/block.dto";
import {UserLowService} from "../user/user.low.service";

export class BlockHighService {
    constructor(private blockLowService: BlockLowService , private userLowService: UserLowService) {
    }

    async block(dto: BlockDtoType) {
        const blockedUser = await this.userLowService.findByEmailOrUsername(dto.blockedUserName)
        if (!blockedUser) {
            throw new NotFoundError("User")
        }
        const blockRell: BlockRelationInterface = {
            userId: dto.userId,
            blockedUserId: blockedUser.id
        }
        if (blockRell.userId === blockRell.blockedUserId) {
            throw new BadRequestError("شما نمی‌توانید خودتان را بلاک کنید.")
        }

        const blockRelation = await this.blockLowService.findBlock(blockRell)
        if (blockRelation) {
            throw new BadRequestError(".شما قبلا این کاربر را بلاک کرده‌اید.")
        }

        const newBlockRelation = await this.blockLowService.createBlockRelation(blockRell)


        blockEventEmmmiter.emit("block", newBlockRelation.userId, newBlockRelation.blockedUserId)
        return {status: "blocked"}
        //NOTE: follow userid: followingid, followerid
    }

    async unblock(dto: BlockDtoType) {
        const unBlockedUser = await this.userLowService.findByEmailOrUsername(dto.blockedUserName)
        if (!unBlockedUser) {
            throw new NotFoundError("User")
        }
        const unblock: UnblockRelationInterface = {
            userId: dto.userId,
            blockedUserId: unBlockedUser.id
        }
        if (unblock.userId === unblock.blockedUserId) {
            throw new BadRequestError("شما نمی‌توانید خودتان را آنبلاک کنید.")
        }

        const blockRelation = await this.blockLowService.findBlock(unblock)
        if (!blockRelation) {
            throw new BadRequestError(".شما قبلا این کاربر را بلاک نکرده‌اید.")
        }

        await this.blockLowService.deleteBlockRelation(blockRelation)
        return {status: "unblocked"}
    }


    async checkIfUsersBlockedEachOther(relation: BlockRelationInterface) {
        const blockRelation = await this.blockLowService.findBlock(relation)
        if (!blockRelation) {
            return false
        }
        return true
    }

    async getBlockerUsers(id: UserId) {
        return await this.blockLowService.findBlockerUsers(id)
    }

    async getBlockedUsersById(userId: UserId, limit: number, startTime: Date) {
        return this.blockLowService.getBlockedUsersById(userId, limit, startTime);
    }

}