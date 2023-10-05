import { BookmarkPosts } from "../model/book-mark";

export const zodbookmarkPostssDao = BookmarkPosts.zod.transform((x): BookmarkPosts => x)