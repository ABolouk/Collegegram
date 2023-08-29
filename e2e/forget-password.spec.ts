import { Express } from "express";
import request from "supertest";
import { makeApp } from "../src/api";
import { AppDataSource } from "../src/data-source";

describe("Forget Password", () => {
    let app: Express;
    beforeEach(async () => {
        const dataSource = await AppDataSource.initialize();
        app = makeApp(dataSource);
    })

    afterEach(async () => {
        await AppDataSource.destroy();
    })

    it("should not find a user", async () => {
        await request(app)
            .post('/user/login/forget')
            .send({
                authenticator: "asgar",
            })
            .expect(404);
            
            console.log('00927178-c77e-4908-8ae5-07cfd90d763e')
    })

    it("should find the user and send an email", async () => {
        await request(app)
            .post('/user/login/forget')
            .send({
                authenticator: "mainblock",
            })
            .expect(200);
    })
})