import { z } from "zod";
import { Brand } from "../../../utility/brand";
import bcrypt from "bcrypt";

const saltRounds = 10;

export type Password = Brand<string, "Password">;

export module Password {
  export const is = (str: string): str is Password => {
    return z
      .string()
      .min(8)
      .max(32)
      .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      .safeParse(str).success;
  };

  export const zod = z.coerce.string().refine(is);

  export type Hashed = Brand<string, "HashedPassword">;

  export module Hashed {
    export const mk = (password: Password): Promise<Hashed> => {
      return bcrypt.hash(password, saltRounds).then((x) => x as Hashed);
    };
  }
}
