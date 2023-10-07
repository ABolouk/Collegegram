import {CloseFriendLowService} from "./close-friend.low.service";
import {UserLowService} from "../user.low.service";
import {BlockLowService} from "../../block/block.low.service";
import {CloseFriendDtoType} from "./dto/close-friend.dto";
import {NotFoundError} from "../../../utility/http-errors";

export class CloseFriendHighService {
    constructor(private closeFriendLowService: CloseFriendLowService, private userLowService: UserLowService, private blockLowService: BlockLowService) {
    }

    async addCloseFriend(dto: CloseFriendDtoType) {
        const closeFriendUser = await this.userLowService.getUserByUsername(dto.userName);
        if (!closeFriendUser) {
            throw new NotFoundError('User')
        }
        const blockRelation = {
            userId: dto.userId,
            blockedUserId: closeFriendUser.id
        }
        const isBlock = await this.blockLowService.findBlockRellInTwoWay(blockRelation)
        if (isBlock) {
            throw new NotFoundError('User')
        }
        const closeFriendRelation = {
            userId: dto.userId,
            closeFriendId: closeFriendUser.id,
        }
        const closeFriend = await this.closeFriendLowService.createCloseFriendRelation(closeFriendRelation)

        return {status: 'success'}
    }

    async deleteCloseFriend(dto: CloseFriendDtoType) {
        const closeFriendUser = await this.userLowService.getUserByUsername(dto.userName);
        if (!closeFriendUser) {
            throw new NotFoundError('User')
        }
        const closeFriendRelation = {
            userId: dto.userId,
            closeFriendId: closeFriendUser.id,
        }
        await this.closeFriendLowService.deleteCloseFriendRelation(closeFriendRelation)

        return {status: 'success'}
    }
}