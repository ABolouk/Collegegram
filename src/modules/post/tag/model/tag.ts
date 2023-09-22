import { HexadecimalColor } from "../../../../data/hexadecimal-color";
import { TagId } from "./tag-id";
import { TagTitle } from "./tag-title";

export interface SplittedTag {
  title: string;
  color: string;
}

export interface TagInterface {
  id: TagId;
  title: TagTitle;
  color: HexadecimalColor;
}

export interface CreateTagInterface {
  title: TagTitle;
  color: HexadecimalColor;
}
