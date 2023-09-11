import { z } from "zod";
import { Brand } from "../../../../utility/brand";

export type CommentId = Brand<number, "CommentId">;

export const isCommentId = (value: number): value is CommentId =>
  Number.isInteger(value) && value > 0

export const zodCommentId = z.coerce.number().refine(isCommentId)
