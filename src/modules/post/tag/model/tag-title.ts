import { z } from "zod";
import { Brand } from "../../../../utility/brand";

export type TagTitle = Brand<string, "TagTitle">

const tagTitleRegex = new RegExp(/^[\u0600-\u06FF]{2,32}$/);

export module TagTitle {
    export const is = (value: string):value  is TagTitle => typeof value === "string" && value.length <= 32 && tagTitleRegex.test(value);
    
    export const zod = z.string().refine(is);
}