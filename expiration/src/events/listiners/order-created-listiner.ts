import {
  Listener,
  OrderCreatedEvent,
  Subjects,
} from "@rajasingh545/ticketing-package";
import { Message } from "node-nats-streaming";

import { queueGroupName } from "../../lib";
import { expirationQueue } from "../../service";

export class OrderCreatedListener extends Listener<OrderCreatedEvent> {
  subject: Subjects.OrderCreated = Subjects.OrderCreated;
  queueGroupName: string = queueGroupName;

  async onMessage(data: OrderCreatedEvent["data"], msg: Message) {
    const delay = new Date(data.expiresAt).getTime() - new Date().getTime();
    console.log("Delay in expiration: ", delay);

    await expirationQueue.add(
      {
        orderId: data.id,
      },
      {
        delay,
      }
    );

    msg.ack();
  }
}
