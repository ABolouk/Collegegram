import { z } from "zod";
import { Brand } from "../../../utility/brand";

export type Email = Brand<string, "UserEmail">;

const emailRegex = new RegExp(
    /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
);

export module Email {
    export const is = (value: string): value is Email => emailRegex.test(value);

    export const zod = z.coerce.string().refine(is);

    export type Unique = Brand<Email, "EmailUnique">;
}