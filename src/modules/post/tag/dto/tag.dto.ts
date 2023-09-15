import { z } from "zod";
import { HexadecimalColor } from "../../../../data/hexadecimal-color";
import { randomHexaDecimalColor } from "../../../../utility/random-hexadecimal-color";
import { SplittedTag } from "../model/tag";

export const tagDto = z.object({
    title: z.string().min(2).max(7),
    color: z.string().refine(HexadecimalColor.is),
})

export interface TagDto extends z.infer<typeof tagDto> { }

const splitStringtoTags = (str: string): SplittedTag[] => {
    return str.split(' ').map((value) => ({ title: value, color: randomHexaDecimalColor() }))
}

const isTags = (tags: SplittedTag[]): boolean => {
    return tags
        .map((x) => x.title.length >= 2 && x.title.length <= 7 && HexadecimalColor.is(x.color))
        .every(val => val === true);
}

export const zodTags = z.string().transform(splitStringtoTags).refine(isTags);
