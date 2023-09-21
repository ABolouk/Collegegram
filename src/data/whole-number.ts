import { Brand } from "../utility/brand";
import { Int } from "./int";

export type WholeNumber = Brand<Int, "WholeNumber">;

export module WholeNumber {
    export const is = (x: number): x is WholeNumber => Int.is(x) && x >= 0;
}