import { BRAND, z } from 'zod';
import { Brand } from '../../../utility/brand';
import { Email } from './user.email';
import { UserName } from './user.username';
import { type } from 'os';


export type UserAuth = Brand<string, "UserAuth">

export module UserAuth {
    export const is = (value: string): value is UserAuth =>
        Email.is(value) || UserName.is(value)
    
    export const zod = z.coerce.string().refine(is);

    export type Unique = Brand<UserAuth, "UserAuthUnique">;
}