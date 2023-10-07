import { z } from "zod";
import { Brand } from "../../../utility/brand";

export type Int = Brand<number, "Int">;

export module Int {
    export const is = (value: number): value is Int =>
        value % 1 === 0

    export const zod = z.coerce.number().refine(is);
}