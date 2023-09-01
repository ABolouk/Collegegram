import { z } from 'zod';
import { Brand } from '../../../utility/brand';
import { isUserEmail } from './user.email';
import { isUserName } from './user.username';

export type UserAuth = Brand<string, 'UserAuth'>;

export const isUserAuth = (value: string): value is UserAuth =>
    isUserEmail(value) || isUserName(value);

export const zodUserAuth = z.coerce.string().refine(isUserAuth);