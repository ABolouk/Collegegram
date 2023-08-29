import { UserEmail } from "../model/user.email";
import { UserId } from "../model/user.id";
import { userName } from "../model/user.username";


export interface createUserDto {
    id: UserId
    email: UserEmail,
    username: userName,
    password: string
}
