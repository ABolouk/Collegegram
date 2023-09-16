import { z } from "zod";
import { Brand } from "../../../utility/brand";
import { Int } from "./int";

export type FollowReqId = Brand<Int, "FollowReqId">;

export module FollowReqId {
    export const is = (value: number): value is FollowReqId =>
        Int.is(value)

    export const zod = z.coerce.number().refine(is); 

}