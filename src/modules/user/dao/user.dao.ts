import { UserEntity } from "../entity/user.entity";
import { UserId } from "../model/user.id";
import { UserEmail } from "../model/user.email";
import { userName } from "../model/user.username";


export type UserOutput = {
  username: string
  email: string
}

export type UserOutputFull = {
  id: UserId;
  email: UserEmail;
  username: userName;
  bio?: string;
  firstName?: string;
  lastName?: string;
  avatar?: string;
  isPrivate: boolean;
}

export const CreateUserDao = (user : UserEntity): UserOutput => ({
  username: user.username,
  email: user.email
})

export const CreateFullUserDao = (userEntity: UserEntity): UserOutputFull => ({
  id: userEntity.id,
  username: userEntity.username,
  email: userEntity.email,
  bio: userEntity.bio,
  firstName: userEntity.firsrName,
  lastName: userEntity.lastName,
  avatar: userEntity.avatar,
  isPrivate: userEntity.isPrivate

})
