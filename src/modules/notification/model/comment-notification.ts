import { Brand } from "../../../utility/brand";
import { z } from "zod";

export const CommentNotification = "CommentNotification";
export type CommentNotificationType = Brand<string, 'Comment Notification'>;
export module CommentNotificationType {
    export const is = (value: string): value is CommentNotificationType => value === CommentNotification;
    export const zod = z.string().refine(is);
}