import { z } from "zod";
import { Brand } from "../../../utility/brand";

export type PostId = Brand<number, "PostId">;

export const isPostId = (value: number): value is PostId =>
  Number.isInteger(value) && value > 0

export const zodPostId = z.coerce.number().refine(isPostId)
