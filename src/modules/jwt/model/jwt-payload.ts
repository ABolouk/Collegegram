import { UserId } from "../../user/model/user.id";

export interface JwtLoginPayload {
  id: UserId // NOTE: ask about UserId
}

export type verifedToken = "valid" | "invalid" // NOTE: ask about it