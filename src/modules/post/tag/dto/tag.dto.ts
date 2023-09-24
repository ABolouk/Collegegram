import {z} from "zod";
import {HexadecimalColor} from "../../../../data/hexadecimal-color";
import {randomHexaDecimalColor} from "../../../../utility/random-hexadecimal-color";
import {CreateTagInterface, SplittedTag} from "../model/tag";
import {TagTitle} from "../model/tag-title";

export const tagDto = z.object({
    title: z.string().min(2).max(7),
    color: z.string().refine(HexadecimalColor.is),
})

export type TagDtoType = z.infer<typeof tagDto>;

const splitStringtoArray = (str: string): SplittedTag[] => {
    return str.split(' ').map((value) => ({title: value, color: randomHexaDecimalColor()}))
}

const isTags = (tags: SplittedTag[]): boolean => {
    return tags
        .map((x) => x.title.length >= 2 && x.title.length <= 7 && HexadecimalColor.is(x.color))
        .every(val => val === true);
}

const changeStringArrayToTags = (tags: SplittedTag[]): CreateTagInterface[] => {
    return tags.map((x) => ({title: x.title as TagTitle, color: x.color as HexadecimalColor}))
};

export const zodTags = z.string().nonempty().transform(splitStringtoArray).refine(isTags).transform(changeStringArrayToTags);
