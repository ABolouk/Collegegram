import {z} from 'zod';
import { Brand } from '../../../utility/brand';

export type userName = Brand<string, 'userName'>;

const userNameRegex = new RegExp(/^[a-zA-Z0-9][a-zA-Z0-9\_]*$/)

export const isUserName = (value: string): value is userName => 
    userNameRegex.test(value);

export const zodUserEmail = z.coerce.string().refine(isUserName);
