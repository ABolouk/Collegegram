import { NextFunction, Request, Response } from "express";
import { UserService } from "./src/modules/user/userService";
import { UnauthorizedError } from './src/utility/http-errors';
import jwt  from 'jsonwebtoken';
import { isUserId, UserId } from './src/modules/user/model/user.id';

export const loginMiddle = (userService : UserService) => {
    async (req: Request, res: Response, next: NextFunction) => {
        const authHeader = req.headers['authorization']
        const token = authHeader && authHeader.split(' ')[1]
        if (token == null){
            throw new UnauthorizedError()
        }
        const decode = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET as string);

        const {id} = decode as {id: string};
        if(!isUserId(id)){
            throw new UnauthorizedError();
        }

        const loggedInUser = await userService.findById(id);
        
        if(!loggedInUser){
            throw new UnauthorizedError();
        }
        
        req.user = loggedInUser;

        next();
    }
}