import {PostId} from "./post-id";
import {WholeNumber} from "../../../data/whole-number";
import {UserName} from "../../user/model/user.username";
import {UserId} from "../../user/model/user.id";

export interface ExplorePostsDao {
    id: PostId,
    photo: string,
}

export interface ExploreUserDao {
    id: UserId,
    username : UserName,
    firstName: string | null;
    lastName: string | null
    avatar: string | null,
    followerCount: WholeNumber,
    createdAt: Date
}