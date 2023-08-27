import { Response } from "express";
import { HttpError } from "./http-errors";

export const handleExpresss = async <A>(
	res: Response,
	fn: () => Promise<A>,
) => {
	try {
		const data = await fn();
		if (data === true) {
			res.status(201).send("ثبت نام شما با موفقیت انجام شد.")
		}
		res.status(200).send(data);
	} catch (e) {
		if (e instanceof HttpError) {
			res.status(e.status).send({ message: e.message });
			return;
		}
		res.status(500).send({ message: "خطایی رخ داده است. لطفا دوباره تلاش کنید." });
	}
};
