import { Filter, Inbox, Search, SlidersHorizontal } from 'lucide-react';
import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { StatusBadge } from '../components/status-badge';
import type { TicketStatus } from '../domain/ticket';
import { useTickets } from '../features/tickets/ticket-hooks';

const filters: Array<{label:string;value:'all'|TicketStatus}> = [{label:'Todos',value:'all'},{label:'Novos',value:'new'},{label:'Em atendimento',value:'in-progress'},{label:'Aguardando',value:'waiting'},{label:'Resolvidos',value:'resolved'}];

export function TicketsPage() {
  const [params] = useSearchParams();
  const [search, setSearch] = useState(params.get('q') ?? '');
  const [status, setStatus] = useState<'all'|TicketStatus>('all');
  const { data: tickets = [], isLoading, isError, refetch } = useTickets();
  const filtered = useMemo(() => tickets.filter(ticket => (status === 'all' || ticket.status === status) && [ticket.id,ticket.subject,ticket.customer,ticket.company].some(value => value.toLowerCase().includes(search.toLowerCase()))), [tickets,status,search]);

  return <section className="page tickets-page"><header className="page-header"><div><span className="eyebrow">Central de atendimento</span><h1>Tickets</h1><p>Priorize conversas, acompanhe SLAs e mantenha o contexto do cliente.</p></div><button className="primary-button"><Inbox/>Novo ticket</button></header><div className="tickets-toolbar"><div className="tabs">{filters.map(filter=><button key={filter.value} className={status===filter.value?'active':''} onClick={()=>setStatus(filter.value)}>{filter.label}{filter.value==='new'&&<em>{tickets.filter(ticket=>ticket.status==='new').length}</em>}</button>)}</div><div className="toolbar-actions"><label><Search/><input value={search} onChange={event=>setSearch(event.target.value)} placeholder="Buscar na fila"/></label><button><Filter/>Filtros</button><button aria-label="Configurar colunas"><SlidersHorizontal/></button></div></div>
    <article className="panel tickets-table"><div className="tickets-head"><span>Ticket</span><span>Status</span><span>Prioridade</span><span>Responsável</span><span>SLA</span></div>{isLoading&&<div className="state"><span className="spinner"/>Carregando tickets...</div>}{isError&&<div className="state"><strong>Não foi possível carregar a fila.</strong><button onClick={()=>void refetch()}>Tentar novamente</button></div>}{!isLoading&&!isError&&filtered.map(ticket=><Link to={`/tickets/${ticket.id}`} key={ticket.id} className="tickets-table__row"><div className="ticket-identity"><span className={`customer-avatar avatar-${ticket.priority}`}>{ticket.customerInitials}</span><div><strong>{ticket.subject}</strong><small>{ticket.id} · {ticket.customer} · {ticket.company}</small></div></div><StatusBadge status={ticket.status}/><span className={`priority priority--${ticket.priority}`}>{ticket.priority}</span><div className="owner"><span>{ticket.assigneeInitials}</span><small>{ticket.assignee}</small></div><span className={`sla ${ticket.slaMinutesLeft<0?'breached':''}`}>{ticket.slaMinutesLeft<0?'Estourado':`${ticket.slaMinutesLeft} min`}</span></Link>)}{!isLoading&&!filtered.length&&<div className="state"><Search/><strong>Nenhum ticket encontrado.</strong><span>Ajuste a busca ou o filtro selecionado.</span></div>}</article>
  </section>;
}
