import {z} from 'zod';

export const signupDto = z.object({
    email: z.string().email().nonempty(),
    username: z.string().min(4).max(8).nonempty().regex(/^[a-zA-Z0-9][a-zA-Z0-9\_]*$/),
    password: z.string().min(8).max(32).regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
    confirmPassword: z.string().min(8).max(32).regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/),
});

export type signupDto = z.infer<typeof signupDto>;
