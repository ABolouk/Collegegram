import { User, loginUserInterface } from "../model/user";
import { Email } from "../model/user.email";
import { UserId } from "../model/user.id";
import { UserName } from "../model/user.username";
import { z } from "zod";
import { hash } from "bcrypt";
import { HashedPassword } from "../../../utility/password-utils";

// Zod Dao:

export const zodUserDao = z
  .object({
    id: UserId.zod,
    username: UserName.zod,
    email: Email.zod,
    isPrivate: z.boolean()

  }).transform((x): User => x)


export const zodLogginUserDao = z
  .object({
    id: UserId.zod,
    username: UserName.zod,
    email: Email.zod,
    password: HashedPassword.zod,
    isPrivate: z.boolean()

  }).transform((x): loginUserInterface => x)
