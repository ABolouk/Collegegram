import { UserId } from "../../user/model/user.id";
import { CommentInterface } from "../comment/model/comment";
import { TagInterface } from "../tag/model/tag";
import { PostId } from "./post-id";

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
  photos: string[];
  description?: string;
  comments?: CommentInterface[];
  tags?: TagInterface[];
  closeFriends: boolean
}