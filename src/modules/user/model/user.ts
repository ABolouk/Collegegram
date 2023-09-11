import { UserEmail } from "./user.email";
import { UserId } from "./user.id";
import { userName } from "./user.username";

export interface User {
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


export interface CreateUserInterface{
    id: UserId;
    email: UserEmail;
    username: userName;
    password: string;
    isPrivate: boolean;
}

type tempOmit = 'password' | 'id';
export interface UserInformation extends Omit<User, tempOmit> {}

