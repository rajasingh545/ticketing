import { OrderStatus } from "@rajasingh545/ticketing-package";
import { OrderModel } from "../model";
import { OrderCancelledPublisher } from "../events";
import { natsWrapper } from "../nats-wrapper";

class ExpirationEvent {
  async complete(orderId: string) {
    const order = await OrderModel.findById(orderId).populate("ticket");

    if (!order) throw new Error("Order not found");

    order.set({ status: OrderStatus.Cancelled });

    await order.save();
    await new OrderCancelledPublisher(natsWrapper.client).publish({
      id: order.id,
      version: order.version,
      ticket: {
        id: order.ticket.id,
      },
    });
    return order;
  }
}

export const expirationEvent = new ExpirationEvent();
