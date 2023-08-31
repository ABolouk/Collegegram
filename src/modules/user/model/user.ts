import { UserEmail } from './user.email';
import { UserId } from "./user.id";
import { userName } from "./user.username";
import { firstName } from './user.firstName';
import { lastName } from './user.lastName';

export interface UserInterface {
    id: UserId;
    email: UserEmail;
    username: userName;
    password: string;
    bio?: string;
    firstName?: string;
    lastName?: string;
    avatar?: string;
    isPrivate: boolean;
}

export interface updateUser {
    email: UserEmail;
    password: string;
    firstName: firstName;
    lastName: lastName;
    avatar: string;
    bio: string;
    isPrivate: boolean;
}
type tempOmit = 'password' | 'id';
export interface UserInformation extends Omit<UserInterface, tempOmit> { }

