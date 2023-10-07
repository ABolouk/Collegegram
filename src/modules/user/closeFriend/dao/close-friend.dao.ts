import {z} from "zod";
import {closeFriendId} from "../model/close-friend.id";
import {UserId} from "../../model/user.id";
import {CloseFriendRelationInterface} from "../model/close-friend";

export const zodCloseFriendDao = z.object({
    userId: UserId.zod,
    closeFriendId: UserId.zod,
}).transform((x): CloseFriendRelationInterface => x)