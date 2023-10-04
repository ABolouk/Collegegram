import {UserId} from "../../../user/model/user.id";
import {PostId} from "../../model/post-id";
import {likeInterface} from "../model/like";
import {z} from "zod";

export const zodLike = z.object({
    userId: UserId.zod,
    postId: PostId.zod,
}).transform((x): likeInterface => x);