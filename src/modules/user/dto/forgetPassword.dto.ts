import { z } from "zod";
import { zodUserEmail } from "../model/user.email";
import { zodUserName } from "../model/user.username";

export const forgetPasswordDto = z.object({
  authenticator: z.union([zodUserEmail, zodUserName]),
});

export type ForgetPasswordDto = z.infer<typeof forgetPasswordDto>;
