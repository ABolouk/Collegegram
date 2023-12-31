import { Email } from './user.email';
import { UserId } from "./user.id";
import { UserName } from "./user.username";
import { firstName } from './user.firstName';
import { lastName } from './user.lastName';
import { HashedPassword, Password } from '../../../utility/password-utils';
import {WholeNumber} from "../../../data/whole-number";


// User Interface type:??????
export interface User {
    id: UserId;
    email: Email;
    username: UserName;
    password: HashedPassword,
    postCount: WholeNumber;
    followerCount: WholeNumber,
    followingCount: WholeNumber,
    bio: string | null
    firstName: string | null;
    lastName: string | null
    avatar: string;
    isPrivate: boolean;
}



export interface createUserInterface {
    id: UserId;
    email: Email;
    username: UserName;
    password: string;
    isPrivate: boolean;
}


export interface updateUser {
    email: Email;
    password: string;
    firstName: firstName;
    lastName: lastName;
    avatar: string;
    bio: string;
    isPrivate: boolean;
}

export interface MyCollegeGramUserInterface {
    username: UserName;
    firstName: string | null;
    lastName: string | null;
    avatar: string | null;
}
