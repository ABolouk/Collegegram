import { z } from 'zod';
import { Brand } from '../../../utility/brand';

export type UserName = Brand<string, 'UserName'>;

const userNameRegex = new RegExp(/^[a-zA-Z0-9][a-zA-Z0-9\_]*$/)

export module UserName {
    export const is = (value: string): value is UserName => userNameRegex.test(value)

    export const zod = z.coerce.string().refine(is);

    export type Unique = Brand<UserName, "UserNameUnique">;
}