import { UserId } from "../../user/model/user.id";
import { UserName } from "../../user/model/user.username";
import { FollowId } from "./follow.id";

export interface Follow {
    followerId: UserId;
    followingId: UserId;
}

export interface createFollowRelation {
    followerId: UserId;
    followingId: UserId;
}

export interface followIdDao{
    id: FollowId;
}

export interface followDao {
    id: FollowId;
    followerId: UserId;
    followingId: UserId;
}

export interface FollowingId {
    followingId: UserId
}

export type UserFollowingsId = FollowingId[]

