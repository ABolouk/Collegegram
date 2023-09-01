import { z } from "zod";
import { isUserEmail } from "../model/user.email";
import { isUserName } from "../model/user.username";
import { Password } from "../model/password";

export const signupDto = z.object({
  email: z.string().email().nonempty().refine(isUserEmail),
  username: z
    .string()
    .min(4)
    .max(64)
    .nonempty()
    .regex(/^[a-zA-Z0-9][a-zA-Z0-9\_]*$/)
    .refine(isUserName),
  password: Password.zod,
  confirmPassword: z
    .string()
    .min(8)
    .max(32)
    .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
});

export type signupDto = z.infer<typeof signupDto>;
