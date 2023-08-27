import { NextFunction, Request, Response } from "express";
import { UserService } from "./modules/user/userService";
import { UnauthorizedError } from './utility/http-errors';
import jwt, { JwtPayload } from 'jsonwebtoken';
import { UserId, isUserId } from './modules/user/model/user.id';


export const loginMiddle = (userService: UserService) => {
    async (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers['authorization'];
        const token = authHeader && authHeader.split(' ')[1];
        const refreshToken = req.headers['refresh-token'];
        if (!token) {
            throw new UnauthorizedError();
        }
        jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string, async (err, decode) => {
            if (err?.name == 'TokenExpiredError') {
                const session = await userService.findSessionByToken(refreshToken as string);
                if (!session) {
                    throw new UnauthorizedError();
                }
                if (session.expireDate < new Date()) {
                    await userService.deleteToken(refreshToken as string);
                    throw new UnauthorizedError();
                }
                const accessToken = jwt.sign(session.userId, process.env.ACCESS_TOKEN_SECRET as string, { expiresIn: '1h' });
                res.setHeader('authorization', `Bearer ${accessToken}`);
            }
            else if (err?.name == 'JsonWebTokenError') {
                throw new UnauthorizedError();
            }
            const { id } = decode as JwtPayload;
            if (!isUserId(id)) {
                throw new UnauthorizedError();
            }
            const user = await userService.findById(id);
            if (!user) {
                throw new UnauthorizedError();
            }
            req.user = user;

        });

        next();
    };
};
