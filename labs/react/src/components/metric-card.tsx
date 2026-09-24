import type { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  icon: LucideIcon;
  label: string;
  value: string;
  detail: string;
  tone?: string;
}

export function MetricCard({ icon: Icon, label, value, detail, tone = 'violet' }: MetricCardProps) {
  return <article className="metric-card"><span className={`metric-card__icon ${tone}`}><Icon size={19}/></span><div><span>{label}</span><strong>{value}</strong><small>{detail}</small></div></article>;
}
