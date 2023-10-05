import { z } from "zod"
import { PostId } from "../../post/model/post-id";
import { UserId } from "../../user/model/user.id";
import { BookMarkId } from "./book-mark-id";

export interface Bookmark {
  id: BookMarkId,
  userId: UserId,
  postId: PostId
}

export interface BookmarkInterface {
  userId: UserId,
  postId: PostId
}

export type BookmarkPosts = BookmarkPost[]

export interface BookmarkPost {
  postId: PostId
  photos: string[]
  createdAt: Date
}
export module BookmarkPost {
  export const zod = z.object({
    postId: PostId.zod,
    photos: z.array(z.string()),
    createdAt: z.date()
  })
}

export module BookmarkPosts {
  export const zod = z.array(BookmarkPost.zod)
}

