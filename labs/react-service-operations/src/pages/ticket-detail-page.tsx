import { ArrowLeft, Building2, CalendarClock, Check, Clock3, Mail, MessageCircle, MoreHorizontal, Phone, Send, Tag, UserRound } from 'lucide-react';
import { useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { StatusBadge } from '../components/status-badge';
import { statusLabels, type TicketChannel, type TicketStatus } from '../domain/ticket';
import { useTicket, useUpdateTicketStatus } from '../features/tickets/ticket-hooks';

const channelIcons: Record<TicketChannel, typeof Mail> = { email: Mail, chat: MessageCircle, phone: Phone, whatsapp: MessageCircle };

export function TicketDetailPage() {
  const { id = '' } = useParams();
  const { data: ticket, isLoading } = useTicket(id);
  const updateStatus = useUpdateTicketStatus(id);
  const [reply, setReply] = useState('');
  if (isLoading) return <section className="page state large"><span className="spinner"/>Carregando conversa...</section>;
  if (!ticket) return <section className="page state large"><strong>Ticket não encontrado.</strong><Link to="/tickets">Voltar para fila</Link></section>;
  const ChannelIcon = channelIcons[ticket.channel];

  return <section className="page ticket-detail"><Link className="back-link" to="/tickets"><ArrowLeft/>Voltar para tickets</Link><header className="ticket-detail__header"><div><div className="detail-meta"><span>{ticket.id}</span><StatusBadge status={ticket.status}/><span className={`priority priority--${ticket.priority}`}>{ticket.priority}</span></div><h1>{ticket.subject}</h1><p>Aberto por {ticket.customer} · {ticket.createdAt}</p></div><div className="detail-actions"><select value={ticket.status} onChange={event=>updateStatus.mutate(event.target.value as TicketStatus)} disabled={updateStatus.isPending} aria-label="Atualizar status">{Object.entries(statusLabels).map(([value,label])=><option value={value} key={value}>{label}</option>)}</select><button aria-label="Mais ações"><MoreHorizontal/></button></div></header>
    <div className="ticket-detail__layout"><main className="conversation panel"><div className="conversation__channel"><span><ChannelIcon/></span><div><strong>Conversa via {ticket.channel}</strong><small>Última atualização {ticket.updatedAt}</small></div></div>{ticket.messages.map(message=><article className="message" key={message.id}><span>{ticket.customerInitials}</span><div><header><strong>{message.author}</strong><small>{message.createdAt}</small></header><p>{message.body}</p></div></article>)}<article className="message message--agent"><span>AS</span><div><header><strong>Ana Souza</strong><small>Nota interna · há 2 min</small></header><p>Validando os lançamentos com o time financeiro. Já localizamos a segunda transação no gateway.</p></div></article><form className="reply" onSubmit={event=>{event.preventDefault();setReply('')}}><div><button type="button" className="active">Responder</button><button type="button">Nota interna</button></div><textarea value={reply} onChange={event=>setReply(event.target.value)} placeholder="Escreva uma resposta para o cliente..." aria-label="Resposta"/><footer><span>Use <kbd>⌘ Enter</kbd> para enviar</span><button className="primary-button" disabled={!reply.trim()}><Send/>Enviar resposta</button></footer></form></main>
      <aside className="customer-panel"><article className="panel"><div className="customer-profile"><span>{ticket.customerInitials}</span><h2>{ticket.customer}</h2><p>{ticket.company}</p></div><dl><div><dt><Mail/>E-mail</dt><dd>{ticket.customer.toLowerCase().replace(' ','.')}@empresa.com</dd></div><div><dt><Building2/>Empresa</dt><dd>{ticket.company}</dd></div><div><dt><UserRound/>Responsável</dt><dd>{ticket.assignee}</dd></div></dl></article><article className="panel ticket-properties"><h2>Propriedades</h2><div><span><CalendarClock/>SLA restante</span><strong className={ticket.slaMinutesLeft<0?'negative':''}>{ticket.slaMinutesLeft<0?'Prazo excedido':`${ticket.slaMinutesLeft} minutos`}</strong></div><div><span><Clock3/>Última atualização</span><strong>{ticket.updatedAt}</strong></div><div><span><Tag/>Tags</span><p>{ticket.tags.map(tag=><em key={tag}>{tag}</em>)}</p></div></article>{updateStatus.isSuccess&&<div className="save-feedback"><Check/>Status atualizado</div>}</aside></div>
  </section>;
}
