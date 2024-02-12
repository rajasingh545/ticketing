import {
  Subjects,
  Listener,
  TicketCreatedEvent,
} from "@rajasingh545/ticketing-package";
import { Message } from "node-nats-streaming";

import { queueGroupName } from "../../lib";
import { ticketService } from "../../service";

export class TicketCreatedListener extends Listener<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
  queueGroupName: string = queueGroupName;

  async onMessage(
    data: TicketCreatedEvent["data"],
    msg: Message
  ): Promise<void> {
    const { title, price, id } = data;
    await ticketService.create({ id, title, price });

    msg.ack();
  }
}
