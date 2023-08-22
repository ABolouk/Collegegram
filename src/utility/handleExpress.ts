import { Response, raw } from "express";
import { HttpError } from "./http-errors";

export const handleExpresss = async <A>(
	res: Response,
	fn: () => Promise<A>,
) => {
	try {
		const data = await fn();
		res.status(200).send(data);
	} catch (e) {
		if (e instanceof HttpError) {
			res.status(e.status).send({ message: e.message });
			return;
		}
		res.status(500).send({ message: "خطایی رخ داده است. لطفا دوباره تلاش کنید." });
	}
};
