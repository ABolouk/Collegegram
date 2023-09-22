import { z } from "zod";
import { Brand } from "../utility/brand";

export type HexadecimalColor = Brand<string, "HexadecimalColor">;

export module HexadecimalColor {
    export const is = (value: string): value is HexadecimalColor => {
        return new RegExp(/^#([A-Fa-f0-9]{6}|[A-Fa-f0-9]{3})$/).test(value);
    };
    
    export const zod = z.string().refine(is);
  }