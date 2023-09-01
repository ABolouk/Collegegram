import { User } from "../model/user";
import { Email } from "../model/user.email";
import { Username } from "../model/user.username";

export type UserOutputFull = {
  email: Email;
  username: Username;
  bio?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  isPrivate: boolean;
};

export const CreateFullUserDao = (user: User): UserOutputFull => ({
  username: user.username,
  email: user.email,
  bio: user.bio,
  firstName: user.firstName,
  lastName: user.lastName,
  avatar: user.avatar,
  isPrivate: user.isPrivate,
});
