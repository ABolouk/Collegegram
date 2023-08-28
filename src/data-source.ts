import "reflect-metadata";
import { DataSource } from "typeorm";
import dotenv from "dotenv-flow"
import { UserEntity } from "./modules/user/entity/user.entity";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "127.0.0.1",
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    logging: false,
    entities: [UserEntity],
    migrations: ["./src/migrations/*.ts"],
    subscribers: [],
});
