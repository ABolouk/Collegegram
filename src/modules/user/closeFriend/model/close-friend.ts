import {UserId} from "../../model/user.id";
import {UserName} from "../../model/user.username";
import {closeFriendId} from "./close-friend.id";

export interface CloseFriendRelationInterface {
    userId: UserId,
    closeFriendId: UserId,
}

export interface createCloseFriendRelation {
    userId: UserId,
    closeFriendId: UserId,
}