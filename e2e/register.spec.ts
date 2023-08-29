import { Express } from "express";
import request from "supertest";
import { makeApp } from "../src/api";
import { AppDataSource } from "../src/data-source";
import { BadRequestError, ConflictError } from "../src/utility/http-errors";


describe("registerUser", () => {
  
  let app: Express;
  beforeAll(async () => {
      const dataSource = await AppDataSource.initialize();
      app = makeApp(dataSource);
  })
  afterAll(async () => {
      await AppDataSource.destroy();
  })

  it("should successfully register a new user", async () => {
    const res = await request(app)
      .post('/user/register')
      .send(
        {
          username: "salam",
          email: "jsalam_aa@yahoo.com",
          password: "12345678_Am",
          confirmPassword: "12345678_Am"
        }
      )
      .expect(201);
  })

  it("should throw ConflictError if email is already registered", async () => {
    const res = await request(app)
      .post('/user/register')
      .send(
        {
          username: "bbjfkkdj",
          email: "hilbbjai_aa@yahoo.com",
          password: "12345678_Am",
          confirmPassword: "12345678_Am"
        }
      )
      .expect(new ConflictError("ایمیل وارد شده از قبل در کالج‌گرام ثبت شده است").status);
  })

  it("should throw ConflictError if username is already registered", async () => {
    const res = await request(app)
      .post('/user/register')
      .send(
        {
          username: "bbjfdj",
          email: "hilbbjadddi_aa@yahoo.com",
          password: "12345678_Am",
          confirmPassword: "12345678_Am"
        }
      )
      .expect(new ConflictError("یوزرنیم وارد شده از قبل در کالج‌گرام ثبت شده است").status);
  })

  it("should throw BadRequestError if passwords do not match", async () => {
    const res = await request(app)
      .post('/user/register')
      .send(
        {
          username: "abcdef",
          email: "hasssll_aa@yahoo.com",
          password: "12345678_Am",
          confirmPassword: "12345678_AAm"
        }
      )
      .expect(new BadRequestError("پسوردهایی که وارد کردید یکسان نیستند.").status);
  })

  

})