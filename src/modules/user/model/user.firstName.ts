import { z } from "zod";
import { Brand } from "../../../utility/brand";

export type FirstName = Brand<string, "FirstName">;

const firstNameRegex = new RegExp(/^[\u0600-\u06FF\s]{3,64}$/);

export module FirstName {
    export const is = (value: string): value is FirstName => firstNameRegex.test(value);
    export const zod = z.coerce.string().refine(is);
}
