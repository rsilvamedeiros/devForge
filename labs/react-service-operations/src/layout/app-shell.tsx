import { useState, type FormEvent } from 'react';
import { BarChart3, Bell, BookOpenCheck, ChevronDown, CircleHelp, Inbox, LayoutDashboard, Menu, Moon, Search, Settings, Sun, Users, Zap } from 'lucide-react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useTheme } from '../app/theme-context';

const navigation = [
  { to: '/', label: 'Visão geral', icon: LayoutDashboard, end: true },
  { to: '/tickets', label: 'Tickets', icon: Inbox, badge: '8' },
  { to: '/analytics', label: 'Analytics', icon: BarChart3 },
  { to: '/learning', label: 'Trilha React', icon: BookOpenCheck, badge: '5' },
];

export function AppShell() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [search, setSearch] = useState('');
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();

  function submitSearch(event: FormEvent) {
    event.preventDefault();
    navigate(`/tickets${search.trim() ? `?q=${encodeURIComponent(search.trim())}` : ''}`);
    setMenuOpen(false);
  }

  return <div className="shell">
    <header className="topbar"><button className="icon-button menu-button" onClick={() => setMenuOpen(open => !open)} aria-label="Abrir navegação"><Menu/></button><NavLink to="/" className="brand"><span><Zap/></span><div><strong>Nexa Ops</strong><small>Service Operations</small></div></NavLink><form className="global-search" onSubmit={submitSearch}><Search/><input value={search} onChange={event => setSearch(event.target.value)} placeholder="Buscar ticket, cliente ou empresa..." aria-label="Buscar tickets"/><kbd>⌘ K</kbd></form><div className="topbar__actions"><button className="icon-button" onClick={toggleTheme} aria-label={theme === 'dark' ? 'Ativar tema claro' : 'Ativar tema escuro'}>{theme === 'dark' ? <Sun/> : <Moon/>}</button><button className="icon-button notification" aria-label="Notificações"><Bell/><i/></button><div className="profile"><span>AS</span><div><strong>Ana Souza</strong><small>Support Lead</small></div><ChevronDown/></div></div></header>
    <aside className={`sidebar ${menuOpen ? 'is-open' : ''}`}><div className="workspace"><span>NX</span><div><strong>Nexa Workspace</strong><small>Enterprise</small></div><ChevronDown/></div><nav><p>Workspace</p>{navigation.map(item => <NavLink key={item.to} to={item.to} end={item.end} onClick={() => setMenuOpen(false)}>{({ isActive }) => <><item.icon className={isActive ? 'active-icon' : ''}/><span>{item.label}</span>{item.badge && <em>{item.badge}</em>}</>}</NavLink>)}<p>Gerenciamento</p><a href="#team"><Users/><span>Equipe</span></a><a href="#settings"><Settings/><span>Configurações</span></a></nav><div className="sidebar__health"><div><span><i/>Operação saudável</span><strong>98,7%</strong></div><p>SLA cumprido nas últimas 24h</p><div><b style={{width:'98.7%'}}/></div></div><a className="sidebar__help" href="#help"><CircleHelp/><span><strong>Central de ajuda</strong><small>Documentação e suporte</small></span></a></aside>
    <main className="main"><Outlet/></main>{menuOpen && <button className="backdrop" onClick={() => setMenuOpen(false)} aria-label="Fechar navegação"/>}
  </div>;
}
