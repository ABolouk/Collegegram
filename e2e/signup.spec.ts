import { Express } from "express";
import request from "supertest";
import { makeApp } from "../src/api";
import { AppDataSource } from "../src/data-source";


describe("signup", () => {
  
  let app: Express;
  beforeAll(async () => {
      const dataSource = await AppDataSource.initialize();
      app = makeApp(dataSource);
  })
  afterAll(async () => {
      await AppDataSource.destroy();
  })

  it("should create a user", async () => {
    const res = await request(app)
      .post('/user/register')
      .send(
        {
          username: "amirho",
          email: "amirhossein_b@yahoo.com",
          password: "12345678_Am",
          confirmPassword: "12345678_Am"
        }
      )
      .expect(200);
  })
})