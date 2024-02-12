import { Router } from "express";
import { orderRouteHandle } from "../handler";
import { requireAuth } from "@rajasingh545/ticketing-package";

const route = Router();

route.get("/orders", requireAuth, orderRouteHandle.list);

export { route as listOrderRoute };
