import { FollowRepository } from "./follow.repository";
import { createFollowRelation, Follow } from "./model/follow";
import { ConflictError } from "../../utility/http-errors";
import { blockEventEmmmiter } from "../../utility/event-handling";


export class followService {
    constructor(private followRepo: FollowRepository) {
        blockEventEmmmiter.on("block", (x) => this.deleteFollowRelation(x))
    }


    async getFollowRelation(followRelation: Follow) {
        return this.followRepo.getFollowRelation(followRelation);
    }

    async createFollowRelation(followRelation: createFollowRelation) {
        const followRell = await this.getFollowRelation({ followerId: followRelation.followerId, followingId: followRelation.followingId });
        if (followRell) {
            throw new ConflictError("You are already following this user");
        }
        await this.followRepo.createFollowRelation(followRelation);
        return { status: "followed" };
    }

    async deleteFollowRelation(followRelation: Follow) {
        await this.followRepo.deleteFollowRelation(followRelation);
        return { status: "unfollowed" };
    }
}