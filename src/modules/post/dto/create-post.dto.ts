import { z } from "zod"
import { zodTags } from "../tag/dto/tag.dto";

export const createPostDto = z.object({
  description: z.string().max(255),
  tags: zodTags,
  closeFriends: z.coerce.boolean(),
})

export type CreatePostDto = z.infer<typeof createPostDto>;