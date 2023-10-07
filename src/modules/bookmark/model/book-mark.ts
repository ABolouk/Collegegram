import { z } from "zod"
import { PostId } from "../../post/model/post-id";
import { UserId } from "../../user/model/user.id";
import { BookMarkId } from "./book-mark-id";
import { Tag } from "../../post/tag/dto/tag.dto";

export interface Bookmark {
  id: BookMarkId,
  userId: UserId,
  postId: PostId
}

export interface BookmarkInterface {
  userId: UserId,
  postId: PostId
}

export interface BookmarkPost {
  id: BookMarkId,
  post: {
    id: PostId
    photos: string[]
    createdAt: Date
  }
}

export module BookmarkPost {
  export const zod = z.object({
    id: BookMarkId.zod,
    post: z.object({
      id: PostId.zod,
      photos: z.array(z.string()),
      createdAt: z.date()
    })
  })
}

export type BookmarkPosts = BookmarkPost[]

export module BookmarkPosts {
  export const zod = z.array(BookmarkPost.zod)
}
