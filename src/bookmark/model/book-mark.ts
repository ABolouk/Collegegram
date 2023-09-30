import { PostId } from "../../modules/post/model/post-id";
import { UserId } from "../../modules/user/model/user.id";
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