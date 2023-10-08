import { z } from "zod";
import { Brand } from "../../../utility/brand";

export type LastName = Brand<string, "LastName">;

const lastNameRegex = new RegExp(/^[\u0600-\u06FF\s]{3,64}$/);

export module LastName {
    export const is = (value: string): value is LastName => lastNameRegex.test(value);
    export const zod = z.coerce.string().refine(is);
}
