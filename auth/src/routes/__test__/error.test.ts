import request from "supertest";
import { app } from "../../app";

it("Api route notfound", async () => {
  await request(app).get("/api/post/1256").send({}).expect(404);
});
