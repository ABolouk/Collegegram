import { z } from "zod";
import { PostId } from "../../post/model/post-id";

export interface NotificationPost {
    id: PostId;
    photo: string;
}

export module NotificationPost {
    export const zod = z.object({
        id: PostId.zod,
        photos: z.array(z.string()),
    })
}
