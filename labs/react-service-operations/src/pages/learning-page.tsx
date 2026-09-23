import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, Check, ChevronRight, Code2, FlaskConical, Layers3, Rocket, ShieldCheck, Sparkles } from 'lucide-react';

const modules = [
  { id: 'composition', step: '01', title: 'Composição da interface', description: 'Componentes, props, rotas e o shell responsivo do produto.', skills: ['components', 'props', 'router'], icon: Layers3 },
  { id: 'state', step: '02', title: 'Estado e filtros', description: 'Interação local, estado derivado e filtros combináveis da fila.', skills: ['useState', 'useMemo', 'URL state'], icon: Code2 },
  { id: 'remote', step: '03', title: 'Estado remoto', description: 'Queries, cache e estados de carregamento com TanStack Query.', skills: ['query keys', 'cache', 'async UI'], icon: BookOpen },
  { id: 'mutations', step: '04', title: 'Mutations resilientes', description: 'Atualização otimista, rollback e consistência entre telas.', skills: ['mutation', 'rollback', 'feedback'], icon: Rocket },
  { id: 'quality', step: '05', title: 'Qualidade e arquitetura', description: 'Testes de comportamento, fronteiras e decisões justificadas.', skills: ['Vitest', 'RTL', 'trade-offs'], icon: ShieldCheck },
];

const exercises = [
  { level: 'Fundamento', title: 'Filtro por responsável', detail: 'Combine responsável, texto e status sem sincronização por efeito.', tone: 'green' },
  { level: 'Aplicação', title: 'Criar ticket', detail: 'Formulário validado, mutation, cache e foco acessível.', tone: 'violet' },
  { level: 'Aplicação', title: 'Filtros compartilháveis', detail: 'Transforme a URL na fonte de verdade dos filtros.', tone: 'cyan' },
  { level: 'Arquitetura', title: '10 mil tickets', detail: 'Compare paginação e virtualização com métricas reais.', tone: 'amber' },
];

const storageKey = 'nexa-learning-progress';

function initialProgress(): string[] {
  try { return JSON.parse(localStorage.getItem(storageKey) ?? '[]') as string[]; }
  catch { return []; }
}

export function LearningPage() {
  const [completed, setCompleted] = useState(initialProgress);
  const percentage = Math.round((completed.length / modules.length) * 100);
  const nextModule = useMemo(() => modules.find(module => !completed.includes(module.id)), [completed]);

  useEffect(() => localStorage.setItem(storageKey, JSON.stringify(completed)), [completed]);

  function toggleModule(id: string) {
    setCompleted(current => current.includes(id) ? current.filter(item => item !== id) : [...current, id]);
  }

  return <section className="page learning-page">
    <header className="learning-hero">
      <div><span className="eyebrow"><Sparkles/> React learning path</span><h1>Construa, entenda, explique.</h1><p>Uma trilha prática dentro do produto. Concluir módulos registra avanço local; evolução da skill ainda exige evidência.</p></div>
      <div className="learning-progress"><span><strong>{percentage}%</strong><small>da trilha</small></span><div><i style={{ width: `${percentage}%` }}/></div><small>{completed.length} de {modules.length} módulos concluídos</small></div>
    </header>

    <div className="learning-layout">
      <main>
        <div className="section-heading"><div><span className="eyebrow">Trilha principal</span><h2>Do componente à arquitetura</h2></div><span className="module-count">5 módulos</span></div>
        <div className="module-list">{modules.map(module => {
          const done = completed.includes(module.id);
          const Icon = module.icon;
          return <article className={`learning-module ${done ? 'is-complete' : ''}`} key={module.id}>
            <button className="module-check" onClick={() => toggleModule(module.id)} aria-label={`${done ? 'Reabrir' : 'Concluir'} ${module.title}`}>{done ? <Check/> : module.step}</button>
            <span className="module-icon"><Icon/></span>
            <div><small>Módulo {module.step}</small><h3>{module.title}</h3><p>{module.description}</p><div>{module.skills.map(skill => <span key={skill}>{skill}</span>)}</div></div>
            <ChevronRight/>
          </article>;
        })}</div>
      </main>

      <aside className="learning-aside">
        <article className="panel next-step"><span className="eyebrow">Próximo passo</span><FlaskConical/><h2>{nextModule?.title ?? 'Trilha concluída'}</h2><p>{nextModule?.description ?? 'Revise as evidências e registre o que consegue demonstrar sem consulta.'}</p>{nextModule && <button className="primary-button" onClick={() => toggleModule(nextModule.id)}>Marcar como concluído <Check/></button>}</article>
        <article className="panel evidence-card"><ShieldCheck/><div><span className="eyebrow">Critério de evidência</span><h2>Não basta marcar</h2><p>Demonstre o fluxo, provoque uma falha e explique cache, rollback e separação de estado.</p></div></article>
      </aside>
    </div>

    <div className="section-heading exercise-heading"><div><span className="eyebrow">Prática guiada</span><h2>Exercícios do laboratório</h2></div><span className="module-count">4 desafios</span></div>
    <div className="exercise-grid">{exercises.map((exercise, index) => <article className="panel exercise-card" key={exercise.title}><div><span className={`exercise-level ${exercise.tone}`}>{exercise.level}</span><strong>0{index + 1}</strong></div><h3>{exercise.title}</h3><p>{exercise.detail}</p><Link to="/documentation">Ver enunciado completo <ChevronRight/></Link></article>)}</div>
  </section>;
}
