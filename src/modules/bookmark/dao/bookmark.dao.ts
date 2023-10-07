import { BookmarkPost, BookmarkPosts } from "../model/book-mark"


export const zodBookmarkPostsDao = BookmarkPosts.zod.transform((x): BookmarkPosts => x)