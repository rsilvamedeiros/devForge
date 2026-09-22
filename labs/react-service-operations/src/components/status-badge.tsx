import { statusLabels, type TicketStatus } from '../domain/ticket';

export function StatusBadge({ status }: { status: TicketStatus }) {
  return <span className={`status-badge status-badge--${status}`}><i />{statusLabels[status]}</span>;
}
