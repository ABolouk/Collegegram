import { z } from "zod";
import { Brand } from "../../../utility/brand";

export type FirstName = Brand<string, "firstName">;

export module FirstName {
  export module Dard {
    const dard = 2;
    export const zahermar = 3;
  }
  const firstNameRegex = new RegExp(/^[\u0600-\u06FF]{3,64}$/);

  export const is = (value: string): value is FirstName =>
    firstNameRegex.test(value);

  export const zod = z.coerce.string().refine(is);
}
