import { Brand } from "../utility/brand";
import { Int } from "./int";
import {z} from "zod";

export type WholeNumber = Brand<Int, "WholeNumber">;

export module WholeNumber {
    export const is = (x: number): x is WholeNumber => Int.is(x) && x >= 0;

    export const zod = z.coerce.number().refine(is);
}