import { Express } from "express";
import { AppDataSource } from "../../data-source";
import { makeApp } from "../../api";
import request from "supertest";
import { userName } from './model/user.username';
import { NotFoundError, UnauthorizedError } from "../../utility/http-errors";
// jest.useFakeTimers()

describe("User Module", () => {
	let app: Express;
	beforeAll(async () => {
		const dataSource = await AppDataSource.initialize();
		app = makeApp(dataSource);
	});

	afterAll(async () => {
		await AppDataSource.destroy();
	});

	it("should login", async () => {
		const res = await request(app)
		.post("/user/login")
		.send({
			authenticator: "asgar",
			password: "A112345!a",
		})
		.expect(200).expect("Content-Type", /json/);
	});
	it("should not login if wrong username", async () => {
		const res = await request(app)
		.post("/user/login")
		.send({
			authenticator: "asgar1",
			password: "A112345!a",
		})
		.expect(new NotFoundError().status);
	});
	it("should not login if wrong username type", async () => {
		const res = await request(app)
		.post("/user/login")
		.send({
			authenticator: "@asgar1",
			password: "A112345!a",
		})
		.expect(new UnauthorizedError().status);
	});
	it("should not login if wrong password", async () => {
		const res = await request(app)
		.post("/user/login")
		.send({
			authenticator: "asgar",
			password: "A112345!a1",
		})
		.expect(new UnauthorizedError().status);
	})
	
});