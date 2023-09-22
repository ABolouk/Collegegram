import { Brand } from "../../../utility/brand";
import { z } from "zod";

// export type pending = "pending";
// type accepted = "accepted";
// type rejected = "rejected";
// type cancelled = "cancelled";


// export type status = Brand<string , "status">;


export type FollowReqStatus = Brand<string, "FollowReqStatus">;

export module FollowReqStatus {
    export enum status {
        pending = "pending",
        accepted = "accepted",
        rejected = "rejected",
        cancelled = "cancelled",
    }
    export const is = (value: string): value is FollowReqStatus =>
        typeof value === "string" && Object.values(status).includes(value as status);

    export const zod = z.coerce.string().refine(is);

}

const a = FollowReqStatus.is("pending")
