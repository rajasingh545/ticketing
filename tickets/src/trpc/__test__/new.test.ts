import { ticketRouter } from "../trpc";

it("TRPC Conection", async () => {
  const caller = await ticketRouter.createCaller({});
  const result = await caller.ticket.create({ title: "XXXX", price: 10 });
  console.log(result);
});
