import { z } from "zod";
import { Brand } from "../../../../utility/brand";

export type TagId = Brand<number, "TagId">;

export module TagId {
  export const is = (value: number): value is TagId => Number.isInteger(value) && value > 0;

  export const zod = z.coerce.number().refine(is);
}
