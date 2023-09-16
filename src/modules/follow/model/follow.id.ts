import { z } from "zod";
import { Brand } from "../../../utility/brand";
import { Int } from "./int";

export type FollowId = Brand<Int, "FollowId">;

export module FollowId {
    export const is = (value: number): value is FollowId =>
        Int.is(value)

    export const zod = z.coerce.number().refine(is); 

}