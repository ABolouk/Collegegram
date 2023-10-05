import { User } from "../model/user";
import { Email } from "../model/user.email";
import { UserId } from "../model/user.id";
import { UserName } from "../model/user.username";
import { z } from "zod";
import { HashedPassword } from "../../../utility/password-utils";
import { FirstName } from "../model/user.firstName";
import { LastName } from "../model/user.lastName";
import { WholeNumber } from "../../../data/whole-number";

// Zod Dao:

export const zodUserDao = z
    .object({
        id: UserId.zod,
        username: UserName.zod,
        email: Email.zod,
        password: HashedPassword.zod,
        postCount: WholeNumber.zod,
        followerCount: WholeNumber.zod,
        followingCount: WholeNumber.zod,
        bio: z.coerce.string(),
        firstName: z.nullable(FirstName.zod),
        lastName: z.nullable(LastName.zod),
        avatar: z.coerce.string(),
        isPrivate: z.boolean()

    }).transform((x): User => x)

