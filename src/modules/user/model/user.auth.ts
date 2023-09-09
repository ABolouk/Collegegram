import { z } from 'zod';
import { Brand } from '../../../utility/brand';
import { Email } from './user.email';
import { UserName } from './user.username';

export type UserAuth = Brand<string, "UserAuth">

export module UserAuth {
    export const isEmail = (value: string): value is Email =>
        Email.is(value)
    export const isUserName = (value: string): value is UserName =>
        UserName.is(value)
    export const is = (value: string): value is UserAuth =>
        isEmail(value) || isUserName(value);

    export const zod = z.coerce.string().refine(is);

    export type Unique = Brand<UserAuth, "UserAuthUnique">;
}