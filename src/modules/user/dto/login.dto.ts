import {z} from 'zod';

export const loginDto = z.object({
    // email: z.string().email().nonempty().optional(),
    // username: z.string().min(4).max(8).nonempty().regex(/^[a-zA-Z0-9][a-zA-Z0-9\_]*$/).optional(),
    authenticator:z.string().min(4),
    password: z.string().min(8).max(32).regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
    rememberMe: z.boolean().optional(),
});

export type LoginDtoType = z.infer<typeof loginDto>;