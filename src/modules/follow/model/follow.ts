import { UserId } from "../../user/model/user.id";
import { UserName } from "../../user/model/user.username";

export interface Follow {
    followerUsername: UserName;
    followingUsername: UserName;
}

export interface createFollowRelation {
    intractionId: number;
    followerId: UserId;
    followingId: UserId;
}