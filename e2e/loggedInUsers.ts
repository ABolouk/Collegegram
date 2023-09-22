import {Express} from "express";
import request from "supertest";

export const loggedInUsers1 = async (app: Express) => {
    const {body: user} = await request(app)
        .post('/user/login')
        .send({
            authenticator: "testasger",
            password: "A112345!a",
        })
        .expect(200).expect("Content-Type", /json/);
    return user;
}

export const loggedInUsers2 = async (app: Express) => {
    const {body: user} = await request(app)
        .post('/user/login')
        .send({
            authenticator: "mainblock",
            password: "A112345!a",
        })
        .expect(200).expect("Content-Type", /json/);
    return user;
}