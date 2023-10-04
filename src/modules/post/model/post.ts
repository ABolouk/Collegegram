import { UserId } from "../../user/model/user.id";
import { CreateTagInterface } from "../tag/model/tag";
import {Tags} from "../tag/dto/tag.dto";

export interface PostInterface {
  photos: string[];
  description?: string;
  tags?: Tags;
  closeFriends: boolean;
  createdAt: Date;
}

export interface CreatePostInterface {
  userId: UserId;
  photos: string[];
  description?: string;
  tags?: CreateTagInterface[];
  closeFriends: boolean;
}

export interface PostsInterface {
  posts: PostInterface[],
  nextOffset: Date,
  hasMore: boolean,
}