import { z } from "zod";
import { TagId } from "../model/tag-id";
import { TagTitle } from "../model/tag-title";
import { TagColor } from "../model/tag-color";
import { TagInterface } from "../model/tag";

export const zodTagDao = z
  .object({
    id: TagId.zod,
    title: TagTitle.zod,
    color: TagColor.zod,
  }).transform((x): TagInterface => ({title: x.title, color: x.color}))
  