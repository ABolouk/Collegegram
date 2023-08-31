import { z } from "zod";
import { Brand } from "../../../../utility/brand";

export type TagId = Brand<number, "TagId">;

export const isTagId = (value: number): value is TagId =>
  Number.isInteger(value) && value > 0

export const zodTagId = z.coerce.number().refine(isTagId)
