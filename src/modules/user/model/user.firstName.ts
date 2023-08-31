import { z } from "zod";
import { Brand } from "../../../utility/brand";

export type firstName = Brand<string, "firstName">;

const firstNameRegex = new RegExp(/^[\u0600-\u06FF]{3,64}$/);

export const isFirstName = (value: string): value is firstName =>
    firstNameRegex.test(value);

export const zodFirstName = z.coerce.string().refine(isFirstName);