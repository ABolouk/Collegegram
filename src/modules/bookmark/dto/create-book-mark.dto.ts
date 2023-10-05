import { z } from "zod"
import { UserId } from "../../user/model/user.id"
import { PostId } from "../../post/model/post-id"

export const CreateBookmarkDto = z.object({
  userId: UserId.zod,
  postId: PostId.zod
})

export type BookmarkDtoType = z.infer<typeof CreateBookmarkDto>;