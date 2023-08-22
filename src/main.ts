import { makeApp } from "./api";
import { AppDataSource } from "./data-source";
import { UserInterface } from "./modules/user/model/user";


declare global {
	namespace Express {
		interface Request {
			user: UserInterface;
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
