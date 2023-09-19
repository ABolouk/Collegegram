import { UserId } from "../../user/model/user.id";

export interface UserInteractionInterface{
  id: number,
  userId1: UserId,
  userId2: UserId
}

export interface InteractionInterface{
  userId1: UserId,
  userId2: UserId
}

export interface userInteractionId{
  id: number
}
