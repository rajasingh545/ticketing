import {
  OrderCancelledEvent,
  OrderStatus,
} from "@rajasingh545/ticketing-package";
import { TicketModel } from "../../../model/ticket";
import { natsWrapper } from "../../../nats-wrapper";
import { OrderCancelledListener } from "../order-cancelled-listener";
import mongoose from "mongoose";

const setUp = () => {
  const listener = new OrderCancelledListener(natsWrapper.client);

  const orderId = new mongoose.Types.ObjectId().toHexString();
  const ticket = TicketModel.build({
    title: "concert",
    price: 20,
    userId: "asda",
  });
  ticket.set({ orderId });
  ticket.save();

  const data: OrderCancelledEvent["data"] = {
    id: new mongoose.Types.ObjectId().toHexString(),
    version: 0,
    ticket: {
      id: ticket.id,
    },
  };

  //@ts-ignore
  const msg: Message = {
    ack: jest.fn(),
  };

  return { listener, ticket, data, msg };
};

it("updates the ticker, publishes an event, and acks the message", async () => {
  const { listener, ticket, msg, data } = await setUp();

  await listener.onMessage(data, msg);

  const updatedTicket = await TicketModel.findById(ticket.id);

  expect(updatedTicket!.orderId).toBeUndefined();
  expect(msg.ack).toHaveBeenCalled();
  expect(natsWrapper.client.publish).toHaveBeenCalled();
});
