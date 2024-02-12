import { Router } from "express";
import { requireAuth, validateRequest } from "@rajasingh545/ticketing-package";
import { body } from "express-validator";

import { orderRouteHandle } from "../handler";

const route = Router();

route.post(
  "/orders",
  requireAuth,
  [
    body("ticketId")
      .not()
      .isEmpty()
      .withMessage("TicketId must be provided")
      .isMongoId()
      .withMessage("This is not valid ticket id"),
  ],
  validateRequest,
  orderRouteHandle.create
);

export { route as createOrderRoute };
