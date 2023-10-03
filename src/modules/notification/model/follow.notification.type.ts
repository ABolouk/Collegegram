import { Brand } from "../../../utility/brand";
import { z } from "zod";

export const FollowNotification = "FollowNotification";
export type FollowNotificationType = Brand<string, 'Follow Notification'>;
export module FollowNotificationType {
    export const is = (value: string): value is FollowNotificationType => value === FollowNotification;
    export const zod = z.string().refine(is);
}