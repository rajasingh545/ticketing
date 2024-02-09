import { z } from "zod";

import { ticketService } from "../service";
import { trpc } from "../lib";

const create = trpc.procedure
  .input(
    z.object({
      title: z.string({
        required_error: "Title is required",
      }),
      price: z
        .number({
          required_error: "Price is required",
          invalid_type_error: "Price must be a number",
        })
        .gt(0, { message: "Price is required" }),
    })
  )
  .mutation(async ({ input }) => {
    const payload = { ...input, userId: "1234" };
    return await ticketService.create(payload);
  });

export const ticketTrpc = trpc.router({ create });
