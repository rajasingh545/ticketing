import { z } from "zod";

import { ticketService } from "../service";
import { trpc } from "../lib";

const create = trpc.procedure
  .input(
    z.object({
      title: z.string(),
      price: z.number(),
    })
  )
  .mutation(async ({ input }) => {
    const payload = { ...input, userId: "1234" };
    return await ticketService.create(payload);
  });

export const ticketTrpc = trpc.router({ create });
