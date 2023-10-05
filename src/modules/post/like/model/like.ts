import {UserId} from "../../../user/model/user.id";
import {PostId} from "../../model/post-id";

export interface likeInterface {
    userId: UserId;
    postId: PostId;
}