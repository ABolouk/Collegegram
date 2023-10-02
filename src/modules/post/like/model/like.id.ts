import { z } from "zod";
import {Brand} from "../../../../utility/brand";
import {Int} from "../../../../data/int";


export type LikeId = Brand<Int, "LikeId">;

export module LikeId {
    export const is = (value: number): value is LikeId =>
        Int.is(value)

    export const zod = z.coerce.number().refine(is);

}