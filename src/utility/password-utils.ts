import bcrypt from 'bcrypt';
import { z } from 'zod';
import { Brand } from './brand';


export type Password = Brand<string, "Password">

export type HashedPassword = Brand<string, "HashedPassword">;

export module HashedPassword {

  const saltRounds = 10;

  export const is = (value: string): value is HashedPassword =>
    true // bcrypt.hashSync(value, saltRounds) //???

  export const zod = z.coerce.string().refine(is);

  export const mk = (password: Password): Promise<HashedPassword> => {
    return bcrypt.hash(password, saltRounds).then((x) => x as HashedPassword);
  };

  export async function comparePasswords(
    enteredPassword: string,
    hashedPassword: string
  ): Promise<boolean> {
    return bcrypt.compare(enteredPassword, hashedPassword);
  }
}

export module Password {
  export const is = (value: string): value is Password => {
    return z
      .string()
      .min(8)
      .max(32)
      .regex(/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/)
      .safeParse(value).success;
  }

  export const zod = z.coerce.string().refine(is);

  export const makeHashed = (value: Password) => HashedPassword.mk(value)

  export const comparePasswords = (password: Password, hashedPass: HashedPassword) => HashedPassword.comparePasswords(password, hashedPass)

}