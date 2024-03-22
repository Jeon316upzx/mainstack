import supertest from "supertest";
import app from "../src/app";
import { user } from "../src/models/user";

import { testUser, testStore, testProduct } from "./mockData/main.mock";
import { config } from "../src/validators/env.validator";
import mongoose from "mongoose";

const { DATABASE_URL } = config;
const request = supertest(app);

let authToken = null;
let store = null;
let product = null;

beforeAll(async () => {
  await mongoose.connect(DATABASE_URL);
  await user.findOneAndDelete({ email: testUser.email });
});

test("register new user", async () => {
  return request
    .post("/api/mainstack/auth/register")
    .send(testUser)
    .expect(201);
});

test("login new user", async () => {
  return request
    .post("/api/mainstack/auth/login")
    .send({
      email: testUser.email,
      password: testUser.password,
    })
    .expect(200)
    .then((res) => {
      authToken = res.body.data.userToken;
    });
});

test("create a user store", async () => {
  return request
    .post("/api/mainstack/store/createStore")
    .send(testStore)
    .set("Authorization", `Bearer ${authToken}`)
    .expect(201)
    .then((res) => {
      console.log(res.body.data)
      store = res.body.data;
    });
});

test("get store by Id", async () => {
  return request
    .get(`/api/mainstack/store/getStore/${store._id}`)
    .set("Authorization", `Bearer ${authToken}`)
    .expect(200);
});

test("create store product", async () => {
  return request
    .post(`/api/mainstack/product/createProduct/${store._id}`)
    .send(testProduct)
    .set("Authorization", `Bearer ${authToken}`)
    .expect(201)
    .then((res) => {
      product = res.body.data;
    });
});

test("get product by Id", async () => {
  return request
    .get(`/api/mainstack/product/${product._id}`)
    .set("Authorization", `Bearer ${authToken}`)
    .expect(200);
});

afterAll(async () => {
  await mongoose.connection.close();
});
