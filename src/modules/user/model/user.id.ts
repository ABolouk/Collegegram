import { z } from "zod";
import { v4 } from "uuid";
import { Brand } from "../../../utility/brand";
import { isUUID } from "../../../data/uuid";
import { UUID } from "../../../data/uuid";

export type UserId = Brand<UUID, "UserId">;

export module UserId {
  export const is = (value: string): value is UserId => 
    isUUID(value)
  
  export const zod = z.string().refine(is);

  export type Unique = Brand<UserId, "UserIdUnique">;

  export const make = () => v4() as UserId;
}