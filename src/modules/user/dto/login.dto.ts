import { z } from 'zod';
import { isUserAuth } from '../model/user.auth';

export const loginDto = z.object({
    authenticator: z.string().min(4).refine(isUserAuth),
    password: z.string().min(8).max(32).regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
    rememberMe: z.boolean().optional(),
});

export type LoginDtoType = z.infer<typeof loginDto>;