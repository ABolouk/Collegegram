import { z } from "zod";
import { v4 } from "uuid";
import { Brand } from "../../../utility/brand";
import { isUUID } from "../../../data/uuid";
import { UUID } from "../../../data/uuid";

export type PostId = Brand<number, "PostId">;

export module PostId {
  export const is = (value: number): value is PostId =>
    Number.isInteger(value) && value > 0

  export const zod = z.coerce.number().refine(is);

}