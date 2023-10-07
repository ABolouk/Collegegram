import { z } from "zod";
import { Tag } from "../tag/dto/tag.dto";
import { PostInterface } from "../model/post";
import { PostId } from "../model/post-id";
import { WholeNumber } from "../../../data/whole-number";

export const zodPostDao = z.object({
    id: PostId.zod,
    photos: z.array(z.string()),
    description: z.string(),
    tags: z.array(Tag.zod),
    closeFriends: z.boolean(),
    likeCount: WholeNumber.zod,
    bookmarkCount: WholeNumber.zod,
    commentCount: WholeNumber.zod,
    createdAt: z.date(),
}).transform(post => post as PostInterface)