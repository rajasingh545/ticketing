import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import request from "supertest";

import { app } from "../app";

let mongo: MongoMemoryServer;

declare global {
  var signin: () => Promise<string[]>;
}

beforeAll(async () => {
  process.env.JWT_KEY = "sdfsdfsdfgdf";

  mongo = await MongoMemoryServer.create();
  const mongoUri = mongo?.getUri();
  await mongoose.connect(mongoUri, {});
});

beforeEach(async () => {
  const collections = await mongoose.connection.db.collections();

  for (let collection of collections) {
    await collection.deleteMany({});
  }
});

afterAll(async () => {
  if (mongo) {
    await mongo.stop();
  }
  await mongoose.connection.close();
});

global.signin = async () => {
  const payload = {
    email: "test@test.com",
    password: "password",
  };

  const response = await request(app)
    .post("/api/users/signup")
    .send(payload)
    .expect(201);

  const cookie = response.get("Set-Cookie");

  return cookie;
};
