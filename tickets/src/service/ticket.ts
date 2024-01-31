import { TicketModel, TicketAttrs } from "../model/ticket";

class Ticket {
  public async create(payload: TicketAttrs) {
    return await TicketModel.build(payload).save();
  }
}

export const ticketService = new Ticket();
