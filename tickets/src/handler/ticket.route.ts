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

  return res.status(201).json(ticket);
};

const show = async (req: Request, res: Response) => {
  const ticket = await ticketService.get(req.params.id);
  return res.status(200).json(ticket);
};

const getAll = async (req: Request, res: Response) => {
  const tickets = await ticketService.getAll();
  return res.status(200).json(tickets);
};

const update = async (req: Request, res: Response) => {
  const ticket = await ticketService.update(
    req.body,
    req.params.id,
    req!.currentUser!.id
  );

  return res.status(200).json(ticket);
};

export const ticketRouteHandler = { create, show, getAll, update };
