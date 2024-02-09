import request from "supertest";
import { Types } from "mongoose";

import { app } from "../../app";

const id = new Types.ObjectId().toHexString();

const createTicket = () => {
  return request(app)
    .post("/api/tickets")
    .set("Cookie", signin())
    .send({ title: "Developers", price: 10 });
};

it("returns 404 id provided id doesn't exists", async () => {
  await request(app)
    .put(`/api/tickets/${id}`)
    .set("Cookie", signin())
    .send({
      title: "Rajasingh",
      price: 200,
    })
    .expect(404);
});

it("returns 401 if the user not authenticated", async () => {
  await request(app)
    .put(`/api/tickets/${id}`)
    .send({
      title: "Rajasingh",
      price: 200,
    })
    .expect(401);
});

it("returns 401 if the user doesn't owns the ticket", async () => {
  const response = await createTicket();

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", signin())
    .send({
      title: "Rajasingh",
      price: 200,
    })
    .expect(401);
});

it("returns 400 if the user enters invalid title or prices", async () => {
  const cookie = signin();
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title: "Developers", price: 10 });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "",
      price: 200,
    })
    .expect(400);

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send({
      title: "Rajasingh",
      price: 0,
    })
    .expect(400);
});

it("updates the ticket provided the valid inputs", async () => {
  const cookie = signin();
  const payload = {
    title: "Rajasingh",
    price: 200,
  };
  const response = await request(app)
    .post("/api/tickets")
    .set("Cookie", cookie)
    .send({ title: "Developers", price: 10 });

  await request(app)
    .put(`/api/tickets/${response.body.id}`)
    .set("Cookie", cookie)
    .send(payload)
    .expect(200);

  const ticketResponse = await request(app)
    .get(`/api/tickets/${response.body.id}`)
    .set("Cookie", signin())
    .send()
    .expect(200);

  expect(ticketResponse.body.title).toEqual(payload.title);
  expect(ticketResponse.body.price).toEqual(payload.price);
});
