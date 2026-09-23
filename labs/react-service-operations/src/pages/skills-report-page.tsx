import { useMemo, type CSSProperties } from 'react';
import { ArrowUpRight, BarChart3, CheckCircle2, Target, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';
import { progressScore, readProgress } from '../data/graduation';

export function SkillsReportPage() {
  const metrics = useMemo(readProgress, []);
  const score = progressScore(metrics);
  const completed = metrics.filter(item => item.done >= item.total).length;
  const level = score >= 90 ? 'Pronto para defesa' : score >= 70 ? 'Avançado' : score >= 40 ? 'Em evolução' : 'Fundamentos';
  const next = metrics.find(item => item.done < item.total);
  return <section className="page graduation-page">
    <header className="report-hero"><div><span className="eyebrow"><BarChart3/> Relatório de competências</span><h1>Seu domínio React, baseado em evidências.</h1><p>Uma visão consolidada do estudo, prática, avaliação e entrega de produto.</p></div><div className="report-score" style={{'--score':score} as CSSProperties}><span><strong>{score}</strong><small>/100</small></span></div><aside><small>NÍVEL ATUAL</small><strong>{level}</strong><span>{completed}/6 gates completos</span></aside></header>
    <div className="report-grid">{metrics.map(item=>{const percentage=Math.min(Math.round(item.done/item.total*100),100);return <article className="panel" key={item.id}><header><span className={percentage===100?'done':''}>{percentage===100?<CheckCircle2/>:<Target/>}</span><small>{item.weight}% DA NOTA</small></header><h2>{item.label}</h2><p><strong>{item.done}</strong> de {item.total} evidências</p><i><b style={{width:`${percentage}%`}}/></i><footer><span>{percentage}% concluído</span><Link to={item.route}>Continuar<ArrowUpRight/></Link></footer></article>})}</div>
    <section className="panel report-advice"><Trophy/><div><small>PRÓXIMA MELHOR AÇÃO</small><h2>{score===100?'Emitir sua certificação':next?.label}</h2><p>{score===100?'Todos os critérios foram satisfeitos. Revise seu relatório e gere o certificado.':'Conclua o primeiro gate pendente para manter uma progressão coerente.'}</p></div><Link to={score===100?'/certificate':next?.route??'/'}>Avançar<ArrowUpRight/></Link></section>
  </section>;
}
