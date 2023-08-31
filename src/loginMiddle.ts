import { NextFunction, Request, Response } from "express";
import { UserService } from "./modules/user/userService";
import { UnauthorizedError } from './utility/http-errors';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserId, isUserId } from './modules/user/model/user.id';


export const loginMiddle = (userService: UserService) =>
    async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers['authorization'];
        const refreshToken = req.headers['refresh-token'];
        if (!token) {
            res.status(401).send({ message: "شما اجازه دسترسی به این صفحه را ندارید." });
            return;
        }
        const marg = "1ca79d5317ef09fc6e528fe79b02aecffc720b6e65658d5d7c5b18786a37129099fbb8ec40e5f848b39d986143452fab94fcdc0b2b3e7d60277c580e11411174";
        jwt.verify(token, marg,
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
                const decode = jwt.verify(token, marg);
                const { id } = decode as JwtPayload;
                if (!isUserId(id)) {
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
