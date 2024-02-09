import {
  NotAuthorizedError,
  NotFoundError,
} from "@rajasingh545/ticketing-package";
import { TicketModel, TicketAttrs } from "../model/ticket";
class Ticket {
  public async create(payload: TicketAttrs) {
    return await TicketModel.build(payload).save();
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

    return await ticket.save();
  }
}

export const ticketService = new Ticket();
