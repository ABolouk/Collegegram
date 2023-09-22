import { UserId } from "../../user/model/user.id";
import { CommentInterface } from "../comment/model/comment";
import { CreateTagInterface, TagInterface } from "../tag/model/tag";
import { PostId } from "./post-id";
import {PostEntity} from "../entity/post.entity";

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
  posts: PostEntity[],
  nextOffset: number,
}