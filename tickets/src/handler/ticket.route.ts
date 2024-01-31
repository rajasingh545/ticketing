import { Request, Response } from "express";
import { ticketService } from "../service";

const create = async (req: Request, res: Response) => {
  const body = req.body;
  const payload = {
    title: body.title,
    price: body.price,
    userId: req.currentUser!.id,
  };

  const ticket = await ticketService.create(payload);

  return res.status(201).json({ ticket });
};

export const ticketRouteHandler = { create };
