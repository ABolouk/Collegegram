import { z } from "zod";
import { v4 } from "uuid";
import { UUID, isUUID } from "../../../data/UUID";
import { Brand } from "../../../utility/brand";

export type UserId = Brand<UUID, "UserId">;

export const isUserId = (value: string): value is UserId => isUUID(value);

export const zodUserId = z.string().refine(isUserId);

export const makeUserId = () => v4() as UserId;
