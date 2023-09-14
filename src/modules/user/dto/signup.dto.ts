import { z } from 'zod';
import { Email } from '../model/user.email';
import { UserName } from '../model/user.username';
import { Password } from '../../../utility/password-utils';

export const signupDto = z.object({
    email: Email.zod,
    username: UserName.zod,
    password: Password.zod,
    confirmPassword: Password.zod
});

export type signupDto = z.infer<typeof signupDto>;
