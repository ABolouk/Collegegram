import {z} from "zod";
import {PostId} from "../model/post-id";
import {ExplorePostsDao, ExploreUserDao} from "../model/explore";
import {UserName} from "../../user/model/user.username";
import {zodFirstName} from "../../user/model/user.firstName";
import {lastName, zodLastName} from "../../user/model/user.lastName";
import {WholeNumber} from "../../../data/whole-number";
import {UserId} from "../../user/model/user.id";

export const zodExplorePostDao = z.object({
    id: PostId.zod,
    photos: z.array(z.string())
}).transform((x) => {
    return {
        id: x.id,
        photo: x.photos[0]
    } as ExplorePostsDao
})

export const zodExploreUserDao = z.object({
    id: UserId.zod,
    username: UserName.zod,
    firstName: z.nullable(zodFirstName),
    lastName: z.nullable(zodLastName),
    avatar: z.nullable(z.string()),
    followerCount: WholeNumber.zod,
    createdAt: z.date()
}).transform((x): ExploreUserDao => (x))