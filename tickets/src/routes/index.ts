import { Router } from "express";
import { ticketRouteHandler } from "../handler";

const router = Router();

router.get("/tickets", ticketRouteHandler.getAll);

export { router as listTicketRouter };
