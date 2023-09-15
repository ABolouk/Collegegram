import { z } from "zod";
import { Brand } from "../../../../utility/brand";

export type TagTitle = Brand<string, "TagTitle">

export module TagTitle {
    export const is = (value: string):value  is TagTitle => typeof value === "string" && value.length <= 32;
    
    export const zod = z.string().refine(is);
}