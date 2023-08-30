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
    })

    it("should find the user with username", async () => {
        await request(app)
            .post('/user/login/forget')
            .send({
                authenticator: "mainblock",
            })
            .expect(200);
    })

    it("should find the user with email", async () => {
        await request(app)
            .post('/user/login/forget')
            .send({
                authenticator: "amirhosseinbolouk@gmail.com",
            })
            .expect(200);
    })

    it.skip("should send a oneTimeLink and not change password", async () => {
        const { body } = await request(app)
            .post('/user/login/forget')
            .send({
                authenticator: "mainblock",
            })
            .expect(200);
        const { success, oneTimeLink } = body;

        expect(success).toBe(true);
        console.log(oneTimeLink)
        await request(app)
            .post(`${oneTimeLink}`)
            .send({
                password1: "A112345!a",
                password2: "A112345!b"
            })
            .expect(400);

    })

    it.skip("should send a oneTimeLink and change password", async () => {
        const { body } = await request(app)
            .post('/user/login/forget')
            .send({
                authenticator: "mainblock",
            })
            .expect(200);
        const { success, oneTimeLink } = body;

        expect(success).toBe(true);
        console.log(oneTimeLink)
        await request(app)
            .post(`${oneTimeLink}`)
            .send({
                password1: "A112345!b",
                password2: "A112345!b"
            })
            .expect(400);

    })
})