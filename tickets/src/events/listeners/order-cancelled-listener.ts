import {
  Listener,
  OrderCancelledEvent,
  Subjects,
} from "@rajasingh545/ticketing-package";
import { queueGroupName } from "../../lib";
import { Message } from "node-nats-streaming";
import { orderEventService } from "../../service";

export class OrderCancelledListener extends Listener<OrderCancelledEvent> {
  subject: Subjects.OrderCancelled = Subjects.OrderCancelled;
  queueGroupName = queueGroupName;

  async onMessage(data: OrderCancelledEvent["data"], msg: Message) {
    try {
      await orderEventService.cancel(data);
      msg.ack();
    } catch (err) {
      console.log("Ticket Order Created Error:", err);
    }
  }
}
