import {v4} from "uuid";
import {UserId} from "../../user/model/user.id";
import {UserName} from "../../user/model/user.username";
import {FollowReqId} from "./follow.req.id";
import {FollowReqStatus} from "./follow.req.status";
import {User} from '../../user/model/user';

export interface FollowRequest {
    followerUserId: UserId;
    followingUserId: UserId;
}

export interface createFollowRequest {
    followerId: UserId;
    followingId: UserId;
    status: FollowReqStatus.status;
}

export interface followReqIdDao {
    id: FollowReqId;
}

export interface followReqDao {
    id: FollowReqId;
    followerId: UserId;
    followingId: UserId;
    status: FollowReqStatus;
}