export type TicketStatus = 'new' | 'in-progress' | 'waiting' | 'resolved';
export type TicketPriority = 'urgent' | 'high' | 'medium' | 'low';
export type TicketChannel = 'email' | 'chat' | 'phone' | 'whatsapp';

export interface TicketMessage {
  id: string;
  author: string;
  body: string;
  createdAt: string;
  internal?: boolean;
}

export interface Ticket {
  id: string;
  subject: string;
  customer: string;
  customerInitials: string;
  company: string;
  status: TicketStatus;
  priority: TicketPriority;
  channel: TicketChannel;
  assignee: string;
  assigneeInitials: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  slaMinutesLeft: number;
  messages: TicketMessage[];
}

export const statusLabels: Record<TicketStatus, string> = {
  new: 'Novo',
  'in-progress': 'Em atendimento',
  waiting: 'Aguardando cliente',
  resolved: 'Resolvido',
};
