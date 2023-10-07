import {Brand} from "../../../../utility/brand";
import {Int} from "../../../../data/int";
import {z} from "zod";

export type closeFriendId = Brand<Int, "closeFriendId">;

export module closeFriendId {
    export const is = (value: number): value is closeFriendId =>
        Int.is(value)

    export const zod = z.coerce.number().refine(is);

}

