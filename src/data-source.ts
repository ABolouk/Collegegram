import "reflect-metadata";
import { DataSource } from "typeorm";
import { UserEntity } from "./modules/user/entity/user.entity";
import { SessionEntity } from "./modules/user/entity/session.entity";
import 'dotenv-flow/config';

export const AppDataSource = new DataSource({
    type: "postgres",
    host: "127.0.0.1",
    port: 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME,
    logging: false,
    entities: [UserEntity, SessionEntity],
    migrations: ["./src/migrations/*.ts"],
    subscribers: [],
});

