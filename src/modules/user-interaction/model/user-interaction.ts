import { UserId } from "../../user/model/user.id";

export interface UserInteraction{
  id: number,
  userId1: UserId,
  userId2: UserId
}

export interface CreateUserInteraction{
  userId1: UserId,
  userId2: UserId
}

export interface userInteractionId{
  id: number
}
