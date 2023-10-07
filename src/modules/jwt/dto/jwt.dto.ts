import { z } from "zod"

export const jwtDto = z.object({
  token : z.string()
})

export type jwtDto = z.infer<typeof jwtDto>;