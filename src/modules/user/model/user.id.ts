import { z } from "zod";
import { v4 } from "uuid";
import { Brand } from "../../../utility/brand";
import { isUUID } from "../../../data/uuid";
import { UUID } from "../../../data/uuid";

export type UserId = Brand<UUID, "UserId">;

export const isUserId = (value: string): value is UserId => isUUID(value);

export const zodUserId = z.string().refine(isUserId);

export const makeUserId = () => new Date().getTime() + v4() as UserId;
