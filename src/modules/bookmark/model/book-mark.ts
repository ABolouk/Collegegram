import { z } from "zod"
import { PostId } from "../../post/model/post-id";
import { UserId } from "../../user/model/user.id";
import { BookMarkId } from "./book-mark-id";

export interface Bookmark {
  id: BookMarkId,
  userId: UserId,
  postId: PostId
}

export interface bookmarkInterface {
  userId: UserId,
  postId: PostId
}

export type bookmarkPosts = bookmarkPostInterface[]

export interface bookmarkPostInterface {
  PostId: PostId
  photos: string[]
  createdAt: Date
}
export module bookmarkPost {
  export const zod = z.object({
    PostId: PostId.zod,
    photos: z.array(z.string()),
    createdAt: z.date()
  })
}

export module bookmarkPosts {
  export const zod = z.array(bookmarkPost.zod)
}

