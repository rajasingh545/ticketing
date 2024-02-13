import { TicketModel } from "../ticket";

it("implements optimistic concurrency control", async () => {
  const ticket = TicketModel.build({
    title: "concert",
    price: 5,
    userId: "1223",
  });

  await ticket.save();

  const firstInstance = await TicketModel.findById(ticket.id);
  const secondInstance = await TicketModel.findById(ticket.id);

  firstInstance?.set({ price: 10 });
  secondInstance?.set({ price: 15 });

  await firstInstance!.save();

  try {
    await secondInstance!.save();
  } catch (err) {
    return;
  }
  throw new Error("Should not reach this point");
});

it("increment the version number on multiple saves", async () => {
  const ticket = TicketModel.build({
    title: "concert",
    price: 20,
    userId: "123",
  });

  await ticket.save();
  expect(ticket.version).toEqual(0);

  const fetchTicket = await TicketModel.findById(ticket.id);
  fetchTicket?.set({ price: 10 });
  await fetchTicket?.save();

  expect(fetchTicket!.version).toEqual(1);
});
