import { z } from 'zod';
import { isUserEmail } from '../model/user.email';
import { isFirstName } from '../model/user.firstName';
import { isLastName } from '../model/user.lastName';

export const editProfile = z.object({
    email: z.string().nonempty().refine(isUserEmail),
    firstName: z.string().min(4).max(64).refine(isFirstName),
    lastName: z.string().min(4).max(64).refine(isLastName),
    password: z.string().min(8).max(32).regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
    confirmPassword: z.string().min(8).max(32).regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
    isPrivate: z.coerce.boolean(),
    bio: z.string().max(256),
});

export type EditProfileType = z.infer<typeof editProfile>;