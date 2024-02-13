import { TicketModel } from "../model";
import { CreateTicket, UpdateTicket } from "../types";

class Ticket {
  async create(payload: CreateTicket) {
    const ticket = TicketModel.build(payload);
    return await ticket.save();
  }

  async update(payload: UpdateTicket) {
    const ticket = await TicketModel.findByEvent(payload);
    if (!ticket) {
      throw new Error("Ticket not found");
    }

    const { title, price } = payload;

    ticket?.set({ title, price });

    return await ticket?.save();
  }

  async findById(id: string) {
    return await TicketModel.findById(id);
  }
}

export const ticketService = new Ticket();
