import {
  OrderCreatedEvent,
  OrderStatus,
} from "@rajasingh545/ticketing-package";

import { TicketModel } from "../../../model/ticket";
import { natsWrapper } from "../../../nats-wrapper";
import { OrderCreatedListener } from "../order-created-listeners";
import mongoose from "mongoose";
import { Message } from "node-nats-streaming";

const setup = async () => {
  const listener = new OrderCreatedListener(natsWrapper.client);

  const ticket = TicketModel.build({
    title: "concert",
    price: 99,
    userId: "asda",
  });

  ticket.save();

  const data: OrderCreatedEvent["data"] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    status: OrderStatus.AwaitingPayment,
    userId: ticket.userId,
    expiresAt: "as",
    version: 10,
    ticket: {
      id: ticket.id,
      price: ticket.price,
    },
  };

  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, ticket, data, msg };
};

it("sets the user id of the tickets", async () => {
  const { listener, ticket, msg, data } = await setup();

  await listener.onMessage(data, msg);

  const updatedTicket = await TicketModel.findById(ticket.id);

  expect(updatedTicket?.orderId).toEqual(data.id);
});

it("acks the message", async () => {
  const { listener, msg, data } = await setup();
  await listener.onMessage(data, msg);

  expect(msg.ack).toHaveBeenCalled();
});
