import { z } from "zod";

export const forgetPasswordDto = z.object({
    authenticator:z.string().min(4),
})

export type ForgetPasswordDto = z.infer<typeof forgetPasswordDto>;
