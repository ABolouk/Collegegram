import { z } from "zod"
import { UserId } from "../../user/model/user.id";
import { zodTags } from "../tag/dto/tag.dto";

export const createPostDto = z.object({
  userId: z.string().nonempty().refine(UserId.is),
  description: z.string().max(255),
  tags: zodTags,
  closeFriends: z.coerce.boolean(),
})

export type CreatePostDto = z.infer<typeof createPostDto>;