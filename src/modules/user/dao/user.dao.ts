import { UserEntity } from "../entity/user.entity";
import { User } from "../model/user";
import { UserEmail } from "../model/user.email";
import { userName } from "../model/user.username";


export type UserOutput = {
  username: string
  email: string
}

export type UserOutputFull = {
  email: UserEmail;
  username: userName;
  bio?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  isPrivate: boolean;
}


export const CreateFullUserDao = (user: User): UserOutputFull => ({
  username: user.username,
  email: user.email,
  bio: user.bio,
  firstName: user.firstName,
  lastName: user.lastName,
  avatar: user.avatar,
  isPrivate: user.isPrivate

})
