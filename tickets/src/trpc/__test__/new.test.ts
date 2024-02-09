import { TRPCError } from "@trpc/server";
import { ticketRouter } from "../trpc";

it("TRPC returns an error if an invalid title is provided", async () => {
  try {
    const payload = { title: "", price: 10 };

    const caller = await ticketRouter.createCaller({});
    await caller.ticket.create(payload);
  } catch (error) {
    if (error instanceof TRPCError) {
      expect(error.code).toEqual("INTERNAL_SERVER_ERROR");
    }
  }
});

it("TRPC create a ticket", async () => {
  const payload = { title: "Rajasingh", price: 10 };

  const caller = await ticketRouter.createCaller({});
  const result = await caller.ticket.create(payload);
  expect(result.title).toEqual(payload.title);
  expect(result._id);
});
