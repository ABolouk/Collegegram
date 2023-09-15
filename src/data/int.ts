import { Brand } from "../utility/brand";

export type Int = Brand<number, "Int">;

export const isInt = (x: number): x is Int => Number.isInteger(x);

export type WholeNumber = Brand<Int, "WholeNumber">;

export const isWholeNumber = (x: number): x is WholeNumber => isInt(x) && x >= 0;