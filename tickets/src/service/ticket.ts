import {
  NotAuthorizedError,
  NotFoundError,
} from "@rajasingh545/ticketing-package";
import { TicketModel, TicketAttrs } from "../model/ticket";
import { TickerUpdatePublisher, TicketCreatedPublisher } from "../events";
import { natsWrapper } from "../nats-wrapper";
class Ticket {
  public async create(payload: TicketAttrs) {
    const ticket = TicketModel.build(payload);
    await ticket.save();

    await new TicketCreatedPublisher(natsWrapper.client).publish({
      id: ticket.id,
      title: ticket.title,
      price: ticket.price,
      userId: ticket.userId,
    });

    return ticket;
  }

  public async get(payload: string) {
    const tickets = await TicketModel.findById(payload);

    if (!tickets) throw new NotFoundError();

    return tickets;
  }

  public async getAll() {
    return await TicketModel.find({});
  }

  public async update(payload: TicketAttrs, id: string, currentUserId: string) {
    const ticket = await TicketModel.findById(id);
    if (!ticket) throw new NotFoundError();

    if (ticket.userId !== currentUserId) {
      throw new NotAuthorizedError();
    }

    ticket.set({
      title: payload.title,
      price: payload.price,
    });
    await ticket.save();

    await new TickerUpdatePublisher(natsWrapper.client).publish({
      id: ticket.id,
      userId: ticket.userId,
      title: ticket.title,
      price: ticket.price,
    });

    return ticket;
  }
}

export const ticketService = new Ticket();
