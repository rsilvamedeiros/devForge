import { Link } from 'react-router-dom';

export function NotFoundPage() {
  return <section className="page state large"><strong>Página não encontrada.</strong><Link to="/">Voltar para visão geral</Link></section>;
}
