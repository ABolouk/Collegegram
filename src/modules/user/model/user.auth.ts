import { z } from 'zod';
import { Brand } from '../../../utility/brand';
import { UserEmail, isUserEmail } from './user.email';
import { isUserName, userName } from './user.username';

export type UserAuth = UserEmail | userName;

export const isUserAuth = (value: string): value is UserAuth =>
    isUserEmail(value) || isUserName(value);

export const zodUserAuth = z.coerce.string().refine(isUserAuth);