import {CloseFriendRepository} from "./close-friend.repository";
import {CloseFriendRelationInterface, createCloseFriendRelation} from "./model/close-friend";

export class CloseFriendLowService{
    constructor(private closeFriendRepository: CloseFriendRepository){
    }

    async createCloseFriendRelation(closeFriendRelation: createCloseFriendRelation): Promise<CloseFriendRelationInterface> {
        return await this.closeFriendRepository.createCloseFriendRelation(closeFriendRelation)
    }

    async findCloseFriendRelation(closeFriendRelation: CloseFriendRelationInterface): Promise<CloseFriendRelationInterface | null> {
        return await this.closeFriendRepository.findCloseFriendRelation(closeFriendRelation)
    }

    async deleteCloseFriendRelation(closeFriendRelation: CloseFriendRelationInterface){
        return await this.closeFriendRepository.deleteCloseFriendRelation(closeFriendRelation)
    }
}