import express from "express";
import { DataSource } from "typeorm";

export const makeApp = (dataSource: DataSource) => {
    const app = express();

    app.use(express.json())

    app.use((req, res, next) => {
        next();
    })

    return app
}