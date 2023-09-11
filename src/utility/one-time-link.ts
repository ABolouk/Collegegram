import jwt from "jsonwebtoken";
import { User } from "../modules/user/model/user";
import { UserId } from "../modules/user/model/user.id";
import { UserName } from "../modules/user/model/user.username";
import { Email } from "../modules/user/model/user.email";
import 'dotenv-flow/config';
import { BadRequestError } from "./http-errors";
import { loginUserInterface } from "../modules/user/model/user";

export type PayloadType = {
    userId: UserId,
    username: UserName,
    email: Email,
}

export const createOneTimeLinkSecret = (user: loginUserInterface): string => {
    return process.env.JWT_SECRET + user.username;
}

export const createOneTimeLink = (route: string, user: loginUserInterface, expiresInMinute: number) => {
    const payload: PayloadType = {
        userId: user.id,
        username: user.username,
        email: user.email,
    };
    const secret = createOneTimeLinkSecret(user);
    const token = jwt.sign(payload, secret, { expiresIn: `${expiresInMinute}m` });

    return `${route}/${user.id}/${token}`;
}

export const createMessageForOneTimeLink = (oneTimeLink: string, expiresIn: number): string => {
    return `<h1>Change Your Password</h1>
    <p>To reset your password please click on the link below (Expires in <b>${expiresIn}</b> minutes):</p>
    <a href="${oneTimeLink}">OneTimeLink</a>`
}