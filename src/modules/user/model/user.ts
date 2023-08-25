import { UserEmail } from "./user.email";
import { UserId } from "./user.id";
import { userName } from "./user.username";

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

export interface UserInformation extends Omit<UserInterface, 'password'> {}
