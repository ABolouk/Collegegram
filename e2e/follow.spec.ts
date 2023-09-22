import {Express} from "express";
import {AppDataSource} from "../src/data-source";
import {makeApp} from "../src/api";
import request from "supertest";
import {loggedInUsers1, loggedInUsers2} from "./loggedInUsers";
import {ConflictError} from "../src/utility/http-errors";

describe("Forget Password", () => {
    let app: Express;
    beforeEach(async () => {
        const dataSource = await AppDataSource.initialize();
        app = makeApp(dataSource);
    })

    afterEach(async () => {
        await AppDataSource.destroy();
    })

    it("should be fail if no login", async () => {
        await request(app).post("/follow").expect(401);
    });

    it("should follow a user", async () => {
        const loggedInUser = await loggedInUsers1(app);

        await request(app)
            .post('/user/follow')
            .set("authorization", `Bearer ${loggedInUser.token}`)
            .set("refresh-token", `${loggedInUser.refreshToken}`)
            .send({
                username: "bbjfdj",
            })
            .expect({status: "followed"});
    });

    it("should not follow a user twice", async () => {
        const loggedInUser = await loggedInUsers1(app);
        await request(app)
            .post('/user/follow')
            .set("authorization", `Bearer ${loggedInUser.token}`)
            .set("refresh-token", `${loggedInUser.refreshToken}`)
            .send({
                username: "bbjfdj",
            })
            .expect(200);
        await request(app)
            .post('/user/follow')
            .set("authorization", `Bearer ${loggedInUser.token}`)
            .set("refresh-token", `${loggedInUser.refreshToken}`)
            .send({
                username: "bbjfdj",
            })
            .expect(409);
    });
    it("should not follow a user that does not exist", async () => {
        const loggedInUser = await loggedInUsers1(app);
        await request(app)
            .post('/user/follow')
            .set("authorization", `Bearer ${loggedInUser.token}`)
            .set("refresh-token", `${loggedInUser.refreshToken}`)
            .send({
                username: "mainblock1",
            })
            .expect(404);
    });
    it("should make follow request if user is private", async () => {
        const loggedInUser = await loggedInUsers1(app);
        await request(app)
            .post('/user/follow')
            .set("authorization", `Bearer ${loggedInUser.token}`)
            .set("refresh-token", `${loggedInUser.refreshToken}`)
            .send({
                username: "mainblock",
            })
            .expect({status: "pending"});
    });

    it("should not follow request if user is already requested", async () => {
        const loggedInUser = await loggedInUsers1(app);
        await request(app)
            .post('/user/follow')
            .set("authorization", `Bearer ${loggedInUser.token}`)
            .set("refresh-token", `${loggedInUser.refreshToken}`)
            .send({
                username: "mainblock",
            })
            .expect({status: "pending"});
        await request(app)
            .post('/user/follow')
            .set("authorization", `Bearer ${loggedInUser.token}`)
            .set("refresh-token", `${loggedInUser.refreshToken}`)
            .send({
                username: "mainblock",
            })
            .expect(400);
    });

    it("should accept follow request if it existed", async () => {
        const loggedInUser = await loggedInUsers1(app);
        await request(app)
            .post('/user/follow')
            .set("authorization", `Bearer ${loggedInUser.token}`)
            .set("refresh-token", `${loggedInUser.refreshToken}`)
            .send({
                username: "mainblock",
            })
            .expect({status: "pending"});
        const loggedInUser2 = await loggedInUsers2(app);
        await request(app)
            .post('/user/acceptFollowRequest')
            .set("authorization", `Bearer ${loggedInUser2.token}`)
            .set("refresh-token", `${loggedInUser2.refreshToken}`)
            .send({
                username: "testasger",
            })
            .expect({status: "accepted"});
    });

    it("should not accept follow request if it did not exist", async () => {
        const loggedInUser = await loggedInUsers1(app);
        const loggedInUser2 = await loggedInUsers2(app);
        await request(app)
            .post('/user/acceptFollowRequest')
            .set("authorization", `Bearer ${loggedInUser2.token}`)
            .set("refresh-token", `${loggedInUser2.refreshToken}`)
            .send({
                username: "testasger",
            })
            .expect(400);
    });

    it("should reject follow request if it existed", async () => {
        const loggedInUser = await loggedInUsers1(app);
        await request(app)
            .post('/user/follow')
            .set("authorization", `Bearer ${loggedInUser.token}`)
            .set("refresh-token", `${loggedInUser.refreshToken}`)
            .send({
                username: "mainblock",
            })
            .expect({status: "pending"});
        const loggedInUser2 = await loggedInUsers2(app);
        await request(app)
            .post('/user/rejectFollowRequest')
            .set("authorization", `Bearer ${loggedInUser2.token}`)
            .set("refresh-token", `${loggedInUser2.refreshToken}`)
            .send({
                username: "testasger",
            })
            .expect({status: "rejected"});
    })

    it("it should be cancel follow request if it existed", async () => {
        const loggedInUser = await loggedInUsers1(app);
        await request(app)
            .post('/user/follow')
            .set("authorization", `Bearer ${loggedInUser.token}`)
            .set("refresh-token", `${loggedInUser.refreshToken}`)
            .send({
                username: "mainblock",
            })
            .expect({status: "pending"});
        await request(app)
            .post('/user/cancelFollowRequest')
            .set("authorization", `Bearer ${loggedInUser.token}`)
            .set("refresh-token", `${loggedInUser.refreshToken}`)
            .send({
                username: "mainblock",
            })
            .expect({status: "canceled"});
    })


})