import {
  Listener,
  OrderCreatedEvent,
  Subjects,
} from "@rajasingh545/ticketing-package";
import { queueGroupName } from "../../lib";
import { Message } from "node-nats-streaming";
import { orderEventService } from "../../service";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName: string = queueGroupName;

  async onMessage(
    data: OrderCreatedEvent["data"],
    msg: Message
  ): Promise<void> {
    await orderEventService.create(data);
    msg.ack();
  }
}
