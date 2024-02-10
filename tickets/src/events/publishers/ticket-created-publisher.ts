import {
  Publisher,
  Subjects,
  TicketCreatedEvent,
} from "@rajasingh545/ticketing-package";

export class TicketCreatedPublisher extends Publisher<TicketCreatedEvent> {
  subject: Subjects.TicketCreated = Subjects.TicketCreated;
}
