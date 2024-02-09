import { requireAuth } from "@rajasingh545/ticketing-package";
import { Router } from "express";
import { ticketRouteHandler } from "../handler";

const router = Router();

router.get("/tickets/:id", requireAuth, ticketRouteHandler.show);

export { router as showTicketRouter };
