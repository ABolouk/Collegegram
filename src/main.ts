import { makeApp } from "./api";
import { AppDataSource } from "./data-source";


const port = 3000;
AppDataSource.initialize().then((dataSource) => {
	const app = makeApp(dataSource);
	app.listen(port, () => {
		console.log("Listen on Port " + port);
	});
});
