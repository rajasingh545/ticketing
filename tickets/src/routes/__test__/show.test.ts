import request from "supertest";
import { Types } from "mongoose";
import { app } from "../../app";

it("returns a 404 if the ticket is not found", async () => {
  const id = new Types.ObjectId().toHexString();
  await request(app)
    .get(`/api/tickets/${id}`)
    .set("Cookie", signin())
    .send()
    .expect(404);
});

it("return the ticket if the ticket is found", async () => {
  const payload = { title: "fdgedf", price: 10 };
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", signin())
    .send(payload);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .set("Cookie", signin())
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toEqual(payload.title);
  expect(ticketResponse.body.price).toEqual(payload.price);
});
