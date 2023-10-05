import { z } from "zod";
import { Tag } from "../tag/dto/tag.dto";
import { PostInterface } from "../model/post";

export const zodPostDao = z.object({
    photos: z.array(z.string()),
    description: z.string(),
    tags: z.array(Tag.zod),
    closeFriends: z.boolean(),
    createdAt: z.date(),
}).transform(post => post as PostInterface)