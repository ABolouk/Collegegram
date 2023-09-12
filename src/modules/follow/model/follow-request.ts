import { UserId } from "../../user/model/user.id";
import { UserName } from "../../user/model/user.username";

export interface FollowRequest {
    followerUsername: UserName;
    followingUsername: UserName;
}

export interface createFollowRequest {
    interactionId: number;
    followerId: UserId;
    followingId: UserId;
}