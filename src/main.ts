import { makeApp } from "./api";
import { AppDataSource } from "./data-source"
import { User } from "./modules/user/model/user";

declare global {
	namespace Express {
		interface Request {
			user: User;
		}
		namespace Multer {
			/** Object containing file metadata and access information. */
			interface File {
				key: string,
			}
		}
	}
}

const port = 3000;
AppDataSource.initialize().then((dataSource) => {
	const app = makeApp(dataSource);
	app.listen(port, () => {
		console.log("Listen on Port " + port);
	});
});
