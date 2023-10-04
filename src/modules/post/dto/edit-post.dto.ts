import { z } from "zod";
import { Tags } from "../tag/dto/tag.dto";

export const editPostDto = z.object({
    description: z.string().max(255),
    tags: Tags.zod,
    closeFriend: z.coerce.boolean().default(false),
})

export type EditPostDto = z.infer<typeof editPostDto>;
