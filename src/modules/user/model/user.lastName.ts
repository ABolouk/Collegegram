import { z } from "zod";
import { Brand } from "../../../utility/brand";

export type lastName = Brand<string, "LastName">;

const lastNameRegex = new RegExp(/^[\u0600-\u06FF]{3,64}$/);

export const isLastName = (value: string): value is lastName =>
    lastNameRegex.test(value);

export const zodLastName = z.coerce.string().refine(isLastName);