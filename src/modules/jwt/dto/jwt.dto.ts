import { z } from "zod"

export const jwtDto = z.object({
  token : z.string()
})

export interface jwtDto extends z.infer<typeof jwtDto> { };