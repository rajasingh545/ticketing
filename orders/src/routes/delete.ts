import { Router } from "express";
import { orderRouteHandle } from "../handler";
import { requireAuth } from "@rajasingh545/ticketing-package";

const route = Router();

route.delete("/orders/:orderId", requireAuth, orderRouteHandle.remove);

export { route as deleteOrderRoute };
