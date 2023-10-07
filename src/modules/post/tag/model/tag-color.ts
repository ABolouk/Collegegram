import { z } from "zod";
import { Brand } from "../../../../utility/brand";
import { HexadecimalColor } from "../../../../data/hexadecimal-color";

export type TagColor = Brand<HexadecimalColor, "TagColor">;

export module TagColor {
  export const is = (value: string): value is TagColor => HexadecimalColor.is(value);

  export const zod = z.string().refine(is);
}
