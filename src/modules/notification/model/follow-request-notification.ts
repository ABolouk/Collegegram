import {Brand} from "../../../utility/brand";
import {z} from "zod";

export const FollowRequestPendingNotification = "FollowRequestPendingNotification";
export type FollowRequestPendingNotificationType = Brand<string, 'Follow Request Pending Notification'>;
export module FollowRequestPendingNotificationType {
    export const is = (value: string): value is FollowRequestPendingNotificationType =>
        value === FollowRequestPendingNotification;
    export const zod = z.string().refine(is);
}

export const FollowRequestAcceptedNotification = "FollowRequestAcceptedNotification";
export type FollowRequestAcceptedNotificationType = Brand<string, 'Follow Request Accepted Notification'>;
export module FollowRequestAcceptedNotificationType {
    export const is = (value: string): value is FollowRequestAcceptedNotificationType =>
        value === FollowRequestAcceptedNotification;
    export const zod = z.string().refine(is);
}