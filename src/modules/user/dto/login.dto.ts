import { z } from 'zod';
import { Password } from '../../../utility/password-utils';
import { UserName } from '../model/user.username';
import { Email } from '../model/user.email';

export const loginDto = z.object({
    authenticator: z.union([Email.zod, UserName.zod]),
    password: Password.zod,
    rememberMe: z.boolean().optional(),
});

export type LoginDtoType = z.infer<typeof loginDto>;