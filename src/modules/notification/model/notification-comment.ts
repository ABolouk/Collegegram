import { z } from "zod";
import { Content } from "../../post/comment/model/comment-content";

export interface NotificationComment {
    content: Content;
}

export module NotificationComment {
    export const zod = z.object({
        content: Content.zod,
    })
}
