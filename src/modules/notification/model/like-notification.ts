import { z } from "zod";
import { Brand } from "../../../utility/brand";

export const LikeNotification = "LikeNotification";
export type LikeNotificationType = Brand<string, 'Like Notification'>;
export module LikeNotificationType {
    export const is = (value: string): value is LikeNotificationType => value === LikeNotification;
    export const zod = z.string().refine(is);
}