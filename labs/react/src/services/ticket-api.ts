import { initialTickets } from '../data/tickets';
import type { Ticket, TicketStatus } from '../domain/ticket';

let tickets = structuredClone(initialTickets);
const wait = (milliseconds = 350) => new Promise(resolve => setTimeout(resolve, milliseconds));

export async function getTickets(): Promise<Ticket[]> {
  await wait();
  return structuredClone(tickets);
}

export async function getTicket(id: string): Promise<Ticket | undefined> {
  await wait(220);
  return structuredClone(tickets.find(ticket => ticket.id === id));
}

export async function updateTicketStatus(id: string, status: TicketStatus): Promise<Ticket> {
  await wait(300);
  const ticket = tickets.find(item => item.id === id);
  if (!ticket) throw new Error('Ticket não encontrado.');
  ticket.status = status;
  ticket.updatedAt = 'agora';
  return structuredClone(ticket);
}

export function resetTickets(): void {
  tickets = structuredClone(initialTickets);
}
