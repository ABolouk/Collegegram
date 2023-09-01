import { z } from "zod";
import { Brand } from "../../../utility/brand";

export type Username = Brand<string, "userName">;
export module Username {
  export type Unique = Brand<Username, "userNameUnique">;
}

const userNameRegex = new RegExp(/^[a-zA-Z0-9][a-zA-Z0-9\_]*$/);

export const isUserName = (value: string): value is Username =>
  userNameRegex.test(value);

export const zodUserName = z.coerce.string().refine(isUserName);
