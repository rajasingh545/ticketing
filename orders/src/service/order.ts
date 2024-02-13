import {
  BadRequestError,
  NotFoundError,
  OrderStatus,
} from "@rajasingh545/ticketing-package";
import { ticketService } from "./ticket";
import { OrderModel } from "../model";
import { CancelOrder, CreateOrder, ShowOrder } from "../types";
import { OrderCancelledPublisher, OrderCreatedPublisher } from "../events";
import { natsWrapper } from "../nats-wrapper";

const EXPIRATION_WINDOW_SECONDS = 15 * 60;

class Order {
  private ticket = ticketService;

  async create(payload: CreateOrder) {
    const { ticketId, currentUserId } = payload;
    // Find the ticket the user is trying to order in the database
    const ticket = await this.ticket.findById(ticketId);
    if (!ticket) throw new NotFoundError();

    const isReserved = await ticket.isReserved();
    if (isReserved) throw new BadRequestError("Ticket is already reserved");

    // Calculate an expiration data for this order

    const expiration = new Date();
    expiration.setSeconds(expiration.getSeconds() + EXPIRATION_WINDOW_SECONDS);

    // Build order and save ie to the database
    const order = OrderModel.build({
      userId: currentUserId,
      status: OrderStatus.Created,
      expiresAt: expiration,
      ticket,
    });
    await order.save();

    await new OrderCreatedPublisher(natsWrapper.client).publish({
      id: order.id,
      userId: order.userId,
      status: order.status,
      expiresAt: order.expiresAt.toISOString(),
      version: order.version,
      ticket: {
        id: ticket.id,
        price: ticket.price,
      },
    });

    return order;
  }

  async list(currentUserId: string) {
    const orders = await OrderModel.find({ userId: currentUserId }).populate(
      "ticket"
    );

    return orders;
  }

  async show(payload: ShowOrder) {
    return await this.fetchOrder(payload);
  }

  async remove(payload: CancelOrder) {
    const order = await this.fetchOrder(payload);
    order.status = OrderStatus.Cancelled;
    await order.save();

    await new OrderCancelledPublisher(natsWrapper.client).publish({
      id: order!.id,
      version: order.version,
      ticket: {
        id: order.ticket.id,
      },
    });

    return order;
  }

  private async fetchOrder(payload: ShowOrder) {
    const order = await OrderModel.findOne({
      _id: payload.orderId,
      userId: payload.currentUserId,
    }).populate("ticket");

    if (!order) throw new NotFoundError();

    return order;
  }
}

export const orderService = new Order();
