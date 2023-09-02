import "reflect-metadata";
import { DataSource } from "typeorm";
import { UserEntity } from "./modules/user/entity/user.entity";
import { SessionEntity } from "./modules/user/entity/session.entity";
import 'dotenv-flow/config';

export const AppDataSource = new DataSource({
    url: process.env.DB_URL,
    type: "postgres",
    port: 34561,
    username: process.env.DB_USERNAME,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    logging: false,
    entities: [UserEntity, SessionEntity],
    migrations: ["./src/migrations/*.ts"],
    subscribers: [],
});

