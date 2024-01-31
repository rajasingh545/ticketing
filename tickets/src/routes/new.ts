import { requireAuth, validateRequest } from "@rajasingh545/ticketing-package";
import { Router } from "express";
import { body } from "express-validator";
import { ticketRouteHandler } from "../handler";

const router = Router();

router.post(
  "/tickets",
  requireAuth,
  [
    body("title").not().isEmpty().withMessage("Title is required."),
    body("price").isFloat({ gt: 0 }).withMessage("Price is required"),
  ],
  validateRequest,
  ticketRouteHandler.create
);

export { router as createTicketRouter };
