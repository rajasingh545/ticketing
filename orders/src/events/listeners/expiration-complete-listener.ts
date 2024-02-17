import {
  Listener,
  Subjects,
  ExpirationCompleteEvent,
} from "@rajasingh545/ticketing-package";
import { queueGroupName } from "../../lib";
import { Message } from "node-nats-streaming";
import { expirationEvent } from "../../service";

export class ExpirationCompleteListener extends Listener<ExpirationCompleteEvent> {
  subject: Subjects.ExpirationComplete = Subjects.ExpirationComplete;
  queueGroupName: string = queueGroupName;
  async onMessage(data: ExpirationCompleteEvent["data"], msg: Message) {
    try {
      await expirationEvent.complete(data.orderId);
      msg.ack();
    } catch (err) {
      console.log("Order expiration complete error : ", err);
    }
  }
}
