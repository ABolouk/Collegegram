import {UserId} from "../../user/model/user.id";


export interface BlockInterface {
    id: number,
    userId: UserId,
    blockedUserId: UserId
}

export interface BlockRelationInterface {
  userId: UserId,
  blockedUserId: UserId
}

export interface UnblockRelationInterface {
  userId: UserId,
  blockedUserId: UserId
}

export interface BlockedUsersInterface {
    userId: UserId,
    blockedUser: UserId[]
}

export type BlockStatus = "youAreBlocked" | "isBlocked"

