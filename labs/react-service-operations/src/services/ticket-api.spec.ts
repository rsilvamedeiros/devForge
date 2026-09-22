import { beforeEach, describe, expect, it } from 'vitest';
import { getTicket, getTickets, resetTickets, updateTicketStatus } from './ticket-api';

describe('ticketApi', () => {
  beforeEach(resetTickets);

  it('returns a defensive copy of tickets', async () => {
    const first = await getTickets();
    first[0]!.subject = 'changed';
    const second = await getTickets();
    expect(second[0]!.subject).not.toBe('changed');
  });

  it('updates ticket status', async () => {
    await updateTicketStatus('NX-1048', 'in-progress');
    expect((await getTicket('NX-1048'))?.status).toBe('in-progress');
  });
});
