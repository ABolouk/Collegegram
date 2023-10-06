import { firstName } from "../../../user/model/user.firstName";
import { UserId } from "../../../user/model/user.id";
import { lastName } from "../../../user/model/user.lastName";
import { UserName } from "../../../user/model/user.username";
import { PostId } from "../../model/post-id";
import { Content } from "./comment-content";
import { CommentId } from "./comment-id";
import {z} from "zod"

export interface CommentInterface {
  userId: UserId;
  postId: PostId;
  content: Content
}

export interface Comment {
  id: CommentId,
  userId: UserId;
  postId: PostId,
  content: Content,
  createdAt: Date
}

export module Comment {
  export const zod = z.object({
    id: CommentId.zod,
    userId: UserId.zod,
    postId: PostId.zod,
    content: Content.zod,
    createdAt: z.date()
  })
}



export type Comments = Comment[]

export module Comments {
  export const zod = z.array(Comment.zod)
}


export interface GetComment {
  id: CommentId,
  firstName: firstName,
  lastName: lastName,
  userName: UserName
  postId: PostId,
  content: Content,
  createdAt: Date
}