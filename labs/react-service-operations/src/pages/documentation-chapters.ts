import { Blocks, BookOpen, Braces, Component, Database, Dumbbell, Gauge, GitBranch, Layers3, LockKeyhole, Route, Server, Workflow } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

export interface DocumentChapter {
  title: string;
  description: string;
  path: string;
  icon: LucideIcon;
}

export const DOCUMENTATION_CHAPTERS: DocumentChapter[] = [
  { title: 'Handbook React', description: 'Mapa da tecnologia e competências.', path: '/HANDBOOK.md', icon: BookOpen },
  { title: 'Fundamentos e composição', description: 'JSX, components, props e identidade.', path: '/01-FUNDAMENTALS-COMPOSITION.md', icon: Component },
  { title: 'Estado, hooks e formulários', description: 'Ownership, effects, refs e context.', path: '/02-STATE-HOOKS-FORMS.md', icon: Braces },
  { title: 'Rotas e estado remoto', description: 'URL, cache, mutations e rollback.', path: '/03-ROUTING-SERVER-STATE.md', icon: Database },
  { title: 'Arquitetura e experiência', description: 'Features, a11y e design system.', path: '/04-ARCHITECTURE-UX.md', icon: Blocks },
  { title: 'Qualidade e performance', description: 'Testes, profiling e concorrência.', path: '/05-QUALITY-PERFORMANCE.md', icon: Gauge },
  { title: 'Effects, refs e lifecycle', description: 'Sincronização externa, cleanup e closures.', path: '/06-EFFECTS-REFS-LIFECYCLE.md', icon: GitBranch },
  { title: 'Context e estado global', description: 'Ownership, reducers e stores externos.', path: '/07-CONTEXT-GLOBAL-STATE.md', icon: Workflow },
  { title: 'Padrões avançados', description: 'Composição, APIs controladas e boundaries.', path: '/08-ADVANCED-PATTERNS.md', icon: Layers3 },
  { title: 'React concorrente', description: 'Transitions, Suspense e optimistic UI.', path: '/09-CONCURRENT-REACT.md', icon: Gauge },
  { title: 'SSR e Server Components', description: 'Hydration, streaming e boundaries.', path: '/10-SSR-SERVER-COMPONENTS.md', icon: Server },
  { title: 'Segurança e entrega', description: 'Confiança, bundle, configuração e observabilidade.', path: '/11-SECURITY-DELIVERY.md', icon: LockKeyhole },
  { title: 'Ecossistema e operações', description: 'Design systems, upgrades e debugging.', path: '/12-ECOSYSTEM-OPERATIONS.md', icon: Blocks },
  { title: 'Componentes e APIs', description: 'Referência de components, boundaries e DOM.', path: '/13-COMPONENT-API-REFERENCE.md', icon: Component },
  { title: 'Hooks — referência completa', description: 'Do useState às Actions e hooks avançados.', path: '/14-HOOKS-COMPLETE-REFERENCE.md', icon: Braces },
  { title: 'Formulários e Actions', description: 'Validação, pending, erros e optimistic UI.', path: '/15-FORMS-ACTIONS-VALIDATION.md', icon: Workflow },
  { title: 'Testes e acessibilidade', description: 'RTL, MSW, teclado, foco e auditoria.', path: '/16-TESTING-ACCESSIBILITY-REFERENCE.md', icon: Dumbbell },
  { title: 'Performance e debugging', description: 'Profiler, Web Vitals e investigação.', path: '/17-PERFORMANCE-DEBUGGING-REFERENCE.md', icon: Gauge },
  { title: 'Receitas de produção', description: 'Soluções completas para problemas recorrentes.', path: '/18-PRODUCTION-RECIPES.md', icon: Layers3 },
  { title: 'Trilha de aprendizado', description: 'Sequência sugerida e critérios de domínio.', path: '/LEARNING-PATH.md', icon: Route },
  { title: 'Exercícios', description: 'Enunciados completos da prática guiada.', path: '/EXERCISES.md', icon: Dumbbell },
];
