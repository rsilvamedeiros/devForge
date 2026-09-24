import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { getTicket, getTickets, updateTicketStatus } from '../../services/ticket-api';
import type { Ticket, TicketStatus } from '../../domain/ticket';

export const ticketKeys = { all: ['tickets'] as const, detail: (id: string) => ['tickets', id] as const };

export function useTickets() {
  return useQuery({ queryKey: ticketKeys.all, queryFn: getTickets });
}

export function useTicket(id: string) {
  return useQuery({ queryKey: ticketKeys.detail(id), queryFn: () => getTicket(id), enabled: Boolean(id) });
}

export function useUpdateTicketStatus(id: string) {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (status: TicketStatus) => updateTicketStatus(id, status),
    onMutate: async status => {
      await queryClient.cancelQueries({ queryKey: ticketKeys.detail(id) });
      const previous = queryClient.getQueryData<Ticket>(ticketKeys.detail(id));
      queryClient.setQueryData<Ticket>(ticketKeys.detail(id), current => current ? { ...current, status } : current);
      return { previous };
    },
    onError: (_error, _status, context) => queryClient.setQueryData(ticketKeys.detail(id), context?.previous),
    onSuccess: updated => {
      queryClient.setQueryData(ticketKeys.detail(id), updated);
      queryClient.setQueryData<Ticket[]>(ticketKeys.all, current => current?.map(ticket => ticket.id === id ? updated : ticket));
    },
  });
}
