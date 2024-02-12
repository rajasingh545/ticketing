import {
  Publisher,
  OrderCreatedEvent,
  Subjects,
} from "@rajasingh545/ticketing-package";

export class OrderCreatedPublisher extends Publisher<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
}
