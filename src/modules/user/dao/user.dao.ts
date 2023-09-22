import { User, loginUserInterface } from "../model/user";
import { Email } from "../model/user.email";
import { UserId } from "../model/user.id";
import { UserName } from "../model/user.username";
import { z } from "zod";
import { HashedPassword } from "../../../utility/password-utils";
import { isFirstName } from "../model/user.firstName";
import { zodFirstName } from "../model/user.firstName";
import { zodLastName } from "../model/user.lastName";

// Zod Dao:

export const zodUserDao = z
  .object({
    id: UserId.zod,
    username: UserName.zod,
    email: Email.zod,
    password: HashedPassword.zod,
    bio: z.string(),
    firstName: zodFirstName,
    lastName: zodLastName,
    isPrivate: z.boolean()

  }).transform((x): User => x)


export const zodLogginUserDao = z
  .object({
    id: UserId.zod,
    username: UserName.zod,
    email: Email.zod,
    bio: z.string(),
    firstName: zodFirstName,
    lastName: zodLastName,
    isPrivate: z.boolean()

  }).transform((x): loginUserInterface => x)
