import jwt from "jsonwebtoken";
import { UserInterface } from "../modules/user/model/user";
import { UserId } from "../modules/user/model/user.id";
import { userName } from "../modules/user/model/user.username";
import { UserEmail } from "../modules/user/model/user.email";

export type PayloadType = {
    userId: UserId,
    username: userName,
    email: UserEmail,
}

export const createOneTimeLinkSecret = (user: UserInterface): string => {
    return process.env.JWT_SECRET + user.username;
}

export const createOneTimeLink = (route: string, user: UserInterface, expiresInMinute: number) => {
    const payload: PayloadType = {
        userId: user.id,
        username: user.username,
        email: user.email,
    };
    const secret = createOneTimeLinkSecret(user);
    const token = jwt.sign(payload, secret, { expiresIn: `${expiresInMinute}m` });

    return `${route}/${user.id}/${token}`;
}