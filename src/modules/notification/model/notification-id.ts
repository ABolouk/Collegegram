import { z } from "zod";
import { Brand } from "../../../utility/brand";

export type NotificationId = Brand<number, 'NotificationId'>

export module NotificationId {
    export const is = (value: number) => Number.isInteger(value) && value > 0;
    export const zod = z.coerce.number().refine(is);
}