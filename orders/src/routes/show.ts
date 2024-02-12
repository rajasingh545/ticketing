import { Router } from "express";
import { orderRouteHandle } from "../handler";
import { requireAuth } from "@rajasingh545/ticketing-package";

const route = Router();

route.get("/orders/:orderId", requireAuth, orderRouteHandle.show);

export { route as showOrderRoute };
