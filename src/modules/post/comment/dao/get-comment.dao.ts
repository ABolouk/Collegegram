import { z } from "zod"
import { Comments } from "../model/comment"

export const zodGetCommentDao = Comments.zod.transform((x): Comments => x)