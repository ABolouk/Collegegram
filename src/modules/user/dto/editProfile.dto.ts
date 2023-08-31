import { z } from 'zod';
import { isUserEmail } from '../model/user.email';
import { isFirstName } from '../model/user.firstName';
import { isLastName } from '../model/user.lastName';

export const editProfile = z.object({
    email: z.string().email().nonempty().refine(isUserEmail),
    firtName: z.string().min(4).max(64).refine(isFirstName),
    lastName: z.string().min(4).max(64).refine(isLastName),
    password: z.string().min(8).max(32).regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
    confirmPassword: z.string().min(8).max(32).regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
});

export type EditProfileType = z.infer<typeof editProfile>;