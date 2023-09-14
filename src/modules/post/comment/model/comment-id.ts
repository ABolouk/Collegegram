import { z } from "zod";
import { Brand } from "../../../../utility/brand";

export type CommentId = Brand<number, "CommentId">;


export module CommentId {
  export const is = (value: number): value is CommentId =>
    Number.isInteger(value) && value > 0
  
  export const zod = z.coerce.number().refine(is);
}