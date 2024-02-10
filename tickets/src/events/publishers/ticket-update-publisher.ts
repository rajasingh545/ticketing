import {
  Publisher,
  Subjects,
  TicketUpdatedEvent,
} from "@rajasingh545/ticketing-package";

export class TickerUpdatePublisher extends Publisher<TicketUpdatedEvent> {
  subject: Subjects.TicketUpdated = Subjects.TicketUpdated;
}
