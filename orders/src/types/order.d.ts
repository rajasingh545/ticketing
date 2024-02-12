// Service order create
export interface CreateOrder {
  ticketId: string;
  currentUserId: string;
}

// Service show order
export interface ShowOrder {
  orderId: string;
  currentUserId: string;
}

export type CancelOrder = ShowOrder;
