import {z} from 'zod';
import { Brand } from '../../../utility/brand';

export type UserEmail = Brand<string, 'UserEmail'>;

const emailRegex = new RegExp(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/)

export const isUserEmail = (value: string): value is UserEmail => 
    emailRegex.test(value);

export const zodUserEmail = z.coerce.string().refine(isUserEmail);

