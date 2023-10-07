import { Follow } from "../../follow/model/follow"
import { PostId } from "./post-id"
import { Tag, Tags } from "../tag/dto/tag.dto"
import { User } from "../../user/model/user"
import { UserName } from "../../user/model/user.username"
import { z } from "zod"
import { UserId } from "../../user/model/user.id"
import { WholeNumber } from "../../../data/whole-number"

export interface HomePageUser {
  followingUsers: FollowingUser[]
}



export interface FollowingUser {
  UserName: UserName
}


export interface HomePagePost {
  id: PostId
  userId: UserId
  tags: {title: string, color: string}[]
  photos: string[]
  likeCount: WholeNumber,
  bookmarkCount: WholeNumber,
  commentCount: WholeNumber,
  createdAt: Date
}

export module HomePagePost {
  export const zod = z.object({
    id: PostId.zod,
    userId: UserId.zod,
    tags: z.array(Tag.zod),
    photos: z.array(z.string()),
    likeCount: WholeNumber.zod,
    bookmarkCount: WholeNumber.zod,
    commentCount: WholeNumber.zod,
    createdAt: z.date()
  })
}

export type HomePagePosts = HomePagePost[]


export module HomePagePosts {
  export const zod = z.array(HomePagePost.zod)
}

