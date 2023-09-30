import { z } from "zod";
import { Brand } from "../../utility/brand";
import { Int } from "../../data/int";


export type BookMarkId = Brand<Int, "BookMarkId">;

export module BookMarkId {
  export const is = (value: number): value is BookMarkId =>
    Int.is(value)

  export const zod = z.coerce.number().refine(is);

}
