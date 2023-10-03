import {PostId} from "../../model/post-id";
import {UserId} from "../../../user/model/user.id";
import {z} from "zod";

export const likeDto = z.object({
    userId: UserId.zod,
    postId: PostId.zod,
})

export type LikeDtoType = z.infer<typeof likeDto>;