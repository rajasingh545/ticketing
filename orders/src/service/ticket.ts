import { TicketModel } from "../model";

class Ticket {
  async findById(id: string) {
    return await TicketModel.findById(id);
  }
}

export const ticketService = new Ticket();
