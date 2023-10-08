import { z } from "zod";
import { UserName } from "../../user/model/user.username";
import { FirstName } from "../../user/model/user.firstName";
import { LastName } from "../../user/model/user.lastName";

export interface NotificationUser {
    username: UserName;
    firstName: FirstName;
    lastName: LastName;
    avatar: string;  // url from MinIO
}

export module NotificationUser {
    export const zod = z.object({
        username: UserName.zod,
        firstName: FirstName.zod,
        lastName: LastName.zod,
        avatar: z.string(),  // url from MinIO
    })
}
