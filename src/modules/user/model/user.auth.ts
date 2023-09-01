import { z } from "zod";
import { Brand } from "../../../utility/brand";
import { Email, isUserEmail } from "./user.email";
import { isUserName, Username } from "./user.username";

export type UserAuth = Email | Username;

export const isUserAuth = (value: string): value is UserAuth =>
  isUserEmail(value) || isUserName(value);

export const zodUserAuth = z.coerce.string().refine(isUserAuth);
