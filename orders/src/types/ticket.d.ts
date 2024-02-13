export interface CreateTicket {
  title: string;
  price: number;
  id: string;
}

export interface UpdateTicket extends CreateTicket {
  version: number;
}
