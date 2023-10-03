import {UserId} from "../../user/model/user.id";


export interface BlockInterface {
    id: number,
    userId: UserId,
    blockedUserId: UserId
}

export interface CreateBlockInterface {
    userId: UserId,
    blockedUserId: UserId
}

export interface BlockedUsersInterface {
    userId: UserId,
    blockedUser: UserId[]
}
