import { bookmarkPosts } from "../model/book-mark";

export const zodbookmarkPostssDao = bookmarkPosts.zod.transform((x): bookmarkPosts => x)