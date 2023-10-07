import {MyCollegeGramUserInterface, User} from "../model/user";
import {Email} from "../model/user.email";
import {UserId} from "../model/user.id";
import {UserName} from "../model/user.username";
import {z} from "zod";
import {HashedPassword} from "../../../utility/password-utils";
import {isFirstName} from "../model/user.firstName";
import {zodFirstName} from "../model/user.firstName";
import {zodLastName} from "../model/user.lastName";
import {WholeNumber} from "../../../data/whole-number";

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
        firstName: z.nullable(zodFirstName),
        lastName: z.nullable(zodLastName),
        avatar: z.coerce.string(),
        isPrivate: z.boolean()

    }).transform((x): User => x)

export const zodMyCollegeGramUserDao = z.object({
        id: UserId.zod,
        username: UserName.zod,
        firstName: zodFirstName,
        lastName: zodLastName,
        avatar: z.coerce.string(),
}).transform((user): MyCollegeGramUserInterface => user)
