import { z } from "zod"
import { UserId } from "../../modules/user/model/user.id"
import { PostId } from "../../modules/post/model/post-id"

export const BookMarkDto = z.object({
  userId: UserId.zod,
  postId: PostId.zod
})

export type BookMarkDtoType = z.infer<typeof BookMarkDto>;