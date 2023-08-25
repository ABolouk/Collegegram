import express from "express";
import { DataSource } from "typeorm";
import { UserRepository } from "./modules/user/userRepository";
import { UserService } from "./modules/user/userService";
import { makeUserRouter } from "./routes/user.routes";

export const makeApp = (dataSource: DataSource) => {
    const app = express();

    app.use(express.json())
    const userRepo = new UserRepository(dataSource);
	const userService = new UserService(userRepo);
    app.use("/user", makeUserRouter(userService));
    app.use((req, res, next) => {
        next();
    })
    return app
}