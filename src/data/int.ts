import { Brand } from "../utility/brand";

export type Int = Brand<number, "Int">;

export module Int {
    export const is = (x: number): x is Int => Number.isInteger(x);
}
