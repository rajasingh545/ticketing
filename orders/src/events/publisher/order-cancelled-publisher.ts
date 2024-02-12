import {
  Publisher,
  OrderCancelledEvent,
  Subjects,
} from "@rajasingh545/ticketing-package";

export class OrderCancelledPublisher extends Publisher<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
}
