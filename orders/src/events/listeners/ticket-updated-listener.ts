import {
  Subjects,
  Listener,
  TicketUpdatedEvent,
} from "@rajasingh545/ticketing-package";
import { queueGroupName } from "../../lib";
import { Message } from "node-nats-streaming";
import { ticketService } from "../../service";

export class TicketUpdatedListener extends Listener<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
  queueGroupName: string = queueGroupName;

  async onMessage(
    data: TicketUpdatedEvent["data"],
    msg: Message
  ): Promise<void> {
    try {
      await ticketService.update(data);

      msg.ack();
    } catch (error) {
      console.log("Error on the event");
    }
  }
}
