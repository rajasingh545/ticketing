import {
  OrderCancelledEvent,
  OrderCreatedEvent,
} from "@rajasingh545/ticketing-package";
import { ticketService } from "./ticket";
import { TickerUpdatePublisher } from "../events";
import { natsWrapper } from "../nats-wrapper";
import { TicketModel } from "../model/ticket";

class OrderEvent {
  private ticket = ticketService;
  private client = new TickerUpdatePublisher(natsWrapper.client);

  async create(payload: OrderCreatedEvent["data"]) {
    const ticket = await this.ticket.get(payload.ticket.id);
    ticket.set({ orderId: payload.id });
    await ticket.save();
    await this.client.publish({
      orderId: ticket.orderId,
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      version: ticket.version,
    });

    return ticket;
  }

  async cancel(payload: OrderCancelledEvent["data"]) {
    const ticket = await TicketModel.findById(payload.ticket.id);

    if (!ticket) throw new Error("Ticket not found");

    ticket.set({ orderId: undefined });
    await ticket.save();

    await this.client.publish({
      orderId: ticket.orderId,
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
      version: ticket.version,
    });

    return ticket;
  }
}

export const orderEventService = new OrderEvent();
