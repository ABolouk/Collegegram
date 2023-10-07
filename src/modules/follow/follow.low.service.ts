import {FollowRepository} from "./follow.repository";
import {createFollowRelation, Follow, followDao, followIdDao} from "./model/follow";
import {UserId} from "../user/model/user.id";

export class FollowLowService {
    constructor(private followRepo: FollowRepository) {
    }


    async getFollowRelation(followRelation: Follow) {
        return await this.followRepo.getFollowRelation(followRelation);
    }

    async createFollowRelation(followRelation: createFollowRelation): Promise<followIdDao> {
        return await this.followRepo.createFollowRelation(followRelation);
    }

    async deleteFollowRelation(followRelation: Follow) {
        await this.followRepo.deleteFollowRelation(followRelation);
    }

    async getFollowingsIdByUserId(userId: UserId) {
        return this.followRepo.getFollowingsIdByUserId(userId)
    }

    async getFollowRelInTwoWay(followRelation: Follow): Promise<followDao[] | null> {
        return this.followRepo.getFollowRelInTwoWay(followRelation)
    }

    async getFollowersById(userId: UserId, limit: number, startTime: Date) {
        return this.followRepo.getFollowersById(userId, limit, startTime);
    }

    async getFollowingsById(userId: UserId, limit: number, startTime: Date) {
        return this.followRepo.getFollowingsById(userId, limit, startTime);
    }
}