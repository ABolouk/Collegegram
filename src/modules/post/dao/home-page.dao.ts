import {z} from "zod"
import { PostId } from "../model/post-id"
import { Tag, Tags } from "../tag/dto/tag.dto"
import { HomePagePosts } from "../model/home-page"
import { UserId } from "../../user/model/user.id"
import { HexadecimalColor } from "../../../data/hexadecimal-color"

export const zodHomePagePostsDao = z.array(z.object({
  id: PostId.zod,
  userId: UserId.zod,
  photos: z.array(z.string()),
  tags: z.array(z.object({
    title: z.string(),
    color: z.string()
  }))
})).transform((x): HomePagePosts => x)


