import { UserId } from "../../user/model/user.id";
import { CommentInterface } from "../comment/model/comment";
import { SplittedTag, TagInterface } from "../tag/model/tag";
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
  userId: UserId;
  photos: string[];
  description?: string;
  tags?: SplittedTag[];
  closeFriends: boolean
}