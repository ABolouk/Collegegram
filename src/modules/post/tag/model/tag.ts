import { TagId } from "./tag-id";

export interface TagInterface {
  id: TagId;
  title: string;
  color: string;
}

export interface CreateTagInterface {
  title: string;
  color: string;
}
