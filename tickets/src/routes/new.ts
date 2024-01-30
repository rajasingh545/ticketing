import { requireAuth } from "@rajasingh545/ticketing-package";
import { Router, Request, Response } from "express";

const router = Router();

router.post("/tickets", requireAuth, (req: Request, res: Response) => {
  return res.status(201).json({ success: true });
});

export { router as createTicketRouter };
