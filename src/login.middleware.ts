import jwt, { JwtPayload } from 'jsonwebtoken';
import { NextFunction, Request, Response } from "express";
import { UserHighService } from "./modules/user/user.high.service";
import { UnauthorizedError } from './utility/http-errors';
import { UserId } from './modules/user/model/user.id';
import 'dotenv-flow/config';
import { UserLowService } from "./modules/user/user.low.service";
import { sessionRepository } from "./modules/user/session.repository";
import { SessionLowService } from "./modules/user/session.low.service";


export const loginMiddle = (userLowService: UserLowService, sessionLowService: SessionLowService) =>
    async (req: Request, res: Response, next: NextFunction) => {
        const token = req.headers['authorization'];
        const refreshToken = req.headers['refresh-token'];

        if (!token) {
            res.status(401).send({ message: "شما اجازه دسترسی به این صفحه را ندارید." });
            return;
        }
        const accessKey = process.env.ACCESS_TOKEN_SECRET as string;
        try {
            const decode = await jwt.verify(token, accessKey)
            const { id } = decode as JwtPayload;
            if (!UserId.is(id)) {
                res.status(401).send({ message: "شما اجازه دسترسی به این صفحه را ندارید." });
                return;
            }
            const loggedInUser = await userLowService.findById(id);
            if (!loggedInUser) {
                res.status(401).send({ message: "شما اجازه دسترسی به این صفحه را ندارید." });
                return;
            }
            req.user = loggedInUser;
            next();
        } catch (err) {
            if ( !err || typeof err !== 'object' || !('name' in err)  ) return
            if (err.name === 'TokenExpiredError') {
                const session = await sessionLowService.findSessionByRefreshToken(refreshToken as string);
                if (!session) {
                    res.status(401).send({ message: "شما اجازه دسترسی به این صفحه را ندارید." });
                    return;
                }
                if (session.expireDate < new Date()) {
                    await sessionLowService.deleteToken(refreshToken as string);
                    res.status(401).send({ message: "شما اجازه دسترسی به این صفحه را ندارید." });
                    return;
                }
                // TODO: payload type
                const accessToken = jwt.sign({ id: session.userId }, accessKey, { expiresIn: '1h' });
                res.setHeader('authorization', `Bearer ${accessToken}`);
                const decode = jwt.verify(accessToken, accessKey);
                const { id } = decode as JwtPayload;
                if (!UserId.is(id)) {
                    res.status(401).send({ message: "شما اجازه دسترسی به این صفحه را ندارید." });
                    return;
                }
                const loggedInUser = await userLowService.findById(id);
                if (!loggedInUser) {
                    res.status(401).send({ message: "شما اجازه دسترسی به این صفحه را ندارید." });
                    return;
                }
                req.user = loggedInUser;
                next();
                return;
            }

            if (err.name === 'JsonWebTokenError') {
                res.status(401).send({ message: "شما اجازه دسترسی به این صفحه را ندارید." });
                return;
            }
        }
    };