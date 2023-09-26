import {Response} from "express";
import {HttpError} from "./http-errors";

export const handleExpresss = async <A>(
    res: Response,
    fn: () => Promise<A>,
    statusCode: number = 200
) => {
    try {
        const data = await fn();
        res.status(statusCode).send(data);
    } catch (e) {
        if (e instanceof HttpError) {
            res.status(e.status).send({message: e.message});
            return;
        }
        res.status(500).send({message: "خطایی رخ داده است. لطفا دوباره تلاش کنید."});
    }
};


