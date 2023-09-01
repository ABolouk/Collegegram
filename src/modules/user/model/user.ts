import { Email } from "./user.email";
import { UserId } from "./user.id";
import { Username } from "./user.username";
import { FirstName } from "./user.firstName";
import { lastName } from "./user.lastName";
import { Password } from "./password";

export interface User {
  id: UserId;
  email: Email;
  username: Username;
  bio?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  isPrivate: boolean;
}

export interface CreateUserInterface {
  id: UserId;
  email: Email.Unique;
  username: Username.Unique;
  password: Password.Hashed;
  isPrivate: false;
}

export interface updateUser {
  email: Email;
  password: string;
  firstName: FirstName;
  lastName: lastName;
  avatar: string;
  bio: string;
  isPrivate: boolean;
}
