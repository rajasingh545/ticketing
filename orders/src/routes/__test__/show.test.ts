import mongoose from "mongoose";
import request from "supertest";

import { app } from "../../app";
import { TicketModel } from "../../model";

it("fetches the order", async () => {
  const fakeOrderId = new mongoose.Types.ObjectId();

  const ticket = TicketModel.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 20,
  });
  await ticket.save();

  const user = await signin();

  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  const { body: fetchOrder } = await request(app)
    .get(`/api/orders/${order.id}`)
    .set("Cookie", user)
    .send()
    .expect(200);

  await request(app)
    .get(`/api/orders/${fakeOrderId}`)
    .set("Cookie", user)
    .send()
    .expect(404);

  expect(fetchOrder.id).toEqual(order.id);
});

it("returns a error if one user tries to fetch another users order", async () => {
  const ticket = TicketModel.build({
    id: new mongoose.Types.ObjectId().toHexString(),
    title: "concert",
    price: 20,
  });
  await ticket.save();

  const user = await signin();
  const userTwo = await signin();

  const { body: order } = await request(app)
    .post("/api/orders")
    .set("Cookie", user)
    .send({ ticketId: ticket.id })
    .expect(201);

  await request(app)
    .get(`/api/orders/${order.id}`)
    .set("Cookie", userTwo)
    .send()
    .expect(404);
});
