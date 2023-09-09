import { z } from 'zod';
import { Email } from '../model/user.email';
import { zodLastName } from '../model/user.lastName';
import { Password } from '../../../utility/password-utils';
import { zodFirstName } from '../model/user.firstName';

export const editProfile = z.object({
    email: Email.zod,
    firstName: zodFirstName,
    lastName: zodLastName,
    password: Password.zod,
    confirmPassword: Password.zod,
    email: Email.zod,
    firstName: zodFirstName,
    lastName: zodLastName,
    password: Password.zod,
    confirmPassword: Password.zod,
    isPrivate: z.coerce.boolean(),
    bio: z.string().max(256),
});

export type EditProfileType = z.infer<typeof editProfile>;