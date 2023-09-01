import { z } from "zod"
import { isUserId } from "../../user/model/user.id";


const tag = z.object({
  title: z.string().min(2).max(7),
  color: z.string().nonempty().regex(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/)
})

// const photo = z.string()

export const createPostDto = z.object({
  userId: z.string().nonempty().refine(isUserId),
  photos: z.array(z.string()).min(1).max(10),
  description: z.string().max(255),
  tags: z.array(tag),
  closeFriends: z.boolean()
})

export type CreatePostDto = z.infer<typeof createPostDto>;