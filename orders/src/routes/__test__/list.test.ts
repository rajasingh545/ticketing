import request from "supertest";

import { app } from "../../app";
import { TicketModel } from "../../model";

const buildTicket = async () => {
  const ticket = await TicketModel.build({
    title: "concert",
    price: 20,
  });

  await ticket.save();

  return ticket;
};

it("fetches orders for a particular user", async () => {
  // Create three seperate tickets
  const ticketOne = await buildTicket();
  const ticketTwo = await buildTicket();
  const ticketThree = await buildTicket();

  const userOne = signin();
  const userTwo = signin();

  // Create one order as user #1
  const { body: orderOne } = await request(app)
    .post("/api/orders")
    .set("Cookie", userOne)
    .send({ ticketId: ticketOne.id })
    .expect(201);

  // Create two orders as user #2
  const { body: orderTwo } = await request(app)
    .post("/api/orders")
    .set("Cookie", userTwo)
    .send({ ticketId: ticketTwo.id })
    .expect(201);

  const { body: orderThree } = await request(app)
    .post("/api/orders")
    .set("Cookie", userTwo)
    .send({ ticketId: ticketThree.id })
    .expect(201);

  const {
    body: [firstOrder],
  } = await request(app).get("/api/orders").set("Cookie", userOne).expect(200);

  const {
    body: [secondOrder, thirdOrder],
  } = await request(app).get("/api/orders").set("Cookie", userTwo).expect(200);

  expect(firstOrder.id).toEqual(orderOne.id);
  expect(secondOrder.id).toEqual(orderTwo.id);
  expect(thirdOrder.id).toEqual(orderThree.id);

  expect(firstOrder.ticket.id).toEqual(ticketOne.id);
  expect(secondOrder.ticket.id).toEqual(ticketTwo.id);
  expect(thirdOrder.ticket.id).toEqual(ticketThree.id);
});
