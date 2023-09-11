import { z } from "zod";
import { Email } from "../model/user.email";
import { UserName } from "../model/user.username";


export const forgetPasswordDto = z.object({
    authenticator: z.union([Email.zod, UserName.zod])
})

export type ForgetPasswordDto = z.infer<typeof forgetPasswordDto>;
