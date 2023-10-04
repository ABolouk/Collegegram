import { z } from "zod"
import { Tags } from "../tag/dto/tag.dto";



export const createPostDto = z.object({
  description: z.string().max(255),
  tags: Tags.zod,
  closeFriends: z.coerce.boolean().default(false)

})

export type CreatePostDtoType = z.infer<typeof createPostDto>;