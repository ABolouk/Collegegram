import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import { UserService } from "./modules/user/user.service";
import { UnauthorizedError } from './utility/http-errors';
import { UserId } from './modules/user/model/user.id';
import 'dotenv-flow/config';


export const loginMiddle = (userService: UserService) =>
    async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers['authorization'];
        const refreshToken = req.headers['refresh-token'];

        if (!token) {
            res.status(401).send({ message: "شما اجازه دسترسی به این صفحه را ندارید." });
            return;
        }
        const accessKey= process.env.ACCESS_TOKEN_SECRET as string;
        jwt.verify(token, accessKey,
            async (err) => {
                if (err) {
                    if (err.name === 'TokenExpiredError') {
                        const session = await userService.findSessionByRefreshToken(refreshToken as string);
                        if (!session) {
                            res.status(401).send({ message: "شما اجازه دسترسی به این صفحه را ندارید." });
                            return;
                        }
                        if (session.expireDate < new Date()) {
                            await userService.deleteToken(refreshToken as string);
                            res.status(401).send({ message: "شما اجازه دسترسی به این صفحه را ندارید." });
                            return;
                        }
                        // TODO: payload type
                        const accessToken = jwt.sign({ id: session.userId }, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '1h' });
                        res.setHeader('authorization', `Bearer ${accessToken}`);
                    }

                    if (err?.name === 'JsonWebTokenError') {
                        res.status(401).send({ message: "شما اجازه دسترسی به این صفحه را ندارید." });
                        return;
                    }
                }
                const decode = jwt.verify(token, accessKey);
                const { id } = decode as JwtPayload;
                if (!UserId.is(id)) {
                    throw new UnauthorizedError();
                }
                const loggedInUser = await userService.findById(id);
                if (!loggedInUser) {
                    throw new UnauthorizedError();
                }
                req.user = loggedInUser;

                next();
            })
    };
