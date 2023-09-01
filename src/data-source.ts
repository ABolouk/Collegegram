import "reflect-metadata";
import { DataSource } from "typeorm";
import { UserEntity } from "./modules/user/entity/user.entity";
import { SessionEntity } from "./modules/user/entity/session.entity";
import 'dotenv-flow/config';

export const AppDataSource = new DataSource({
    url: "postgresql://root:FoM5MrpsWuwhzFkrygNZbhml@aberama.iran.liara.ir:34561/postgres",
    type: "postgres",
    // host: "aberama.iran.liara.ir",
    port: 34561,
    // username: "",
    // password: "FoM5MrpsWuwhzFkrygNZbhml",
    // database: "collegegram-db",
    logging: false,
    entities: [UserEntity, SessionEntity],
    migrations: ["./src/migrations/*.ts"],
    subscribers: [],
});

