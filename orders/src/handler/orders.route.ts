import { Request, Response } from "express";
import { orderService } from "../service";

const create = async (req: Request, res: Response) => {
  const { ticketId } = req.body;
  const order = await orderService.create({
    ticketId,
    currentUserId: req.currentUser!.id,
  });
  return res.status(201).json(order);
};

const list = async (req: Request, res: Response) => {
  const orders = await orderService.list(req.currentUser!.id);
  return res.status(200).json(orders);
};

const remove = async (req: Request, res: Response) => {
  const orderId = req.params.orderId;
  const order = await orderService.remove({
    orderId,
    currentUserId: req.currentUser!.id,
  });
  return res.status(204).json(order);
};

const show = async (req: Request, res: Response) => {
  const orderId = req.params.orderId;

  const order = await orderService.show({
    orderId,
    currentUserId: req.currentUser!.id,
  });

  return res.status(200).json(order);
};

export const orderRouteHandle = { create, list, remove, show };
