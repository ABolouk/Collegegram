import { z } from "zod";
import { isUserEmail } from "../model/user.email";
import { isLastName } from "../model/user.lastName";
import { FirstName } from "../model/user.firstName";

export const editProfile = z.object({
  email: z.string().nonempty().refine(isUserEmail),
  firstName: FirstName.zod,
  lastName: z.string().min(4).max(64).refine(isLastName),
  password: z
    .string()
    .min(8)
    .max(32)
    .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
  confirmPassword: z
    .string()
    .min(8)
    .max(32)
    .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
  isPrivate: z.coerce.boolean(),
  bio: z.string().max(256),
});

export type EditProfileType = z.infer<typeof editProfile>;
