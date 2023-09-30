import { UserId } from "../../user/model/user.id";
import { CommentInterface } from "../comment/model/comment";
import { CreateTagInterface, TagInterface } from "../tag/model/tag";
import { PostId } from "./post-id";
import { PostDao } from "../dao/post.dao";

export interface PostInterface {
  id: PostId;
  userId: UserId;
  photos: string[];
  description?: string;
  comments?: CommentInterface[];
  tags?: TagInterface[];
  closeFriends: boolean
}

export interface CreatePostInterface {
  userId: UserId;
  photos: string[];
  description?: string;
  tags?: CreateTagInterface[];
  closeFriends: boolean;
}

export interface PostsInterface {
  posts: PostDao[],
  nextOffset: Date,
  hasMore: boolean,
}