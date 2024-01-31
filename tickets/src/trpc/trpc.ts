import { ticketTrpc } from "../handler";
import { trpc } from "../lib";

export const ticketRouter = trpc.router({ ticket: ticketTrpc });

export type TicketRouter = typeof ticketRouter;
