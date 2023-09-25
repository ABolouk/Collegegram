import { ZodError, string, z } from "zod";
import { HexadecimalColor } from "../../../../data/hexadecimal-color";
import { randomHexaDecimalColor } from "../../../../utility/random-hexadecimal-color";
import { CreateTagInterface, SplittedTag } from "../model/tag";
import { TagTitle } from "../model/tag-title";
import { Brand } from "../../../../utility/brand";

// export const tagDto = z.object({
//     title: z.string().min(2).max(7),
//     color: z.string().refine(HexadecimalColor.is),
// })

// export interface TagDto extends z.infer<typeof tagDto> { }

// const splitStringtoArray = (str: string): SplittedTag[] => {
//     return str.split(' ').map((value) => ({ title: value, color: randomHexaDecimalColor() }))
// }

// const isTags = (tags: SplittedTag[]): boolean => {
//     return tags
//         .map((x) => x.title.length >= 2 && x.title.length <= 7 && HexadecimalColor.is(x.color))
//         .every(val => val === true);
// }

// const changeStringArrayToTags = (tags: SplittedTag[]): CreateTagInterface[] => {
//     return tags.map((x) => ({ title: x.title as TagTitle, color: x.color as HexadecimalColor }))
// };
// export const zodTags = z.string().transform(splitStringtoArray).refine(isTags).transform(changeStringArrayToTags);


// export type Tag = Brand<{ title: TagTitle, color: HexadecimalColor }, "Tag">


export interface Tag {
    title: TagTitle,
    color: HexadecimalColor
}

export module Tag {
    export const is = (value: { title: string, color: string }): value is Tag => {
        return HexadecimalColor.is(value.color) && TagTitle.is(value.title)
    }

    export const zod = z.object({
        title: z.string().min(2).max(7),
        color: z.string().refine(HexadecimalColor.is),
    })
}
export type Tags = Tag[]

function transformTags(value: string | null): Tags {
    if (value === null || value.length === 0) {
        return []
    }
    const tagsArray = value.split(' ').map((x) => ({ title: x as TagTitle, color: randomHexaDecimalColor() as HexadecimalColor }))
    return tagsArray

}

export module Tags {
    export const is = (value: Tag[]): value is Tags => {
        return value.every(Tag.is)
    }

    export const zod = z.string().transform(transformTags).refine(is)
}