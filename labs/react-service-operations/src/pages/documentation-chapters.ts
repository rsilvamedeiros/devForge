import { Blocks, BookOpen, Braces, Component, Database, Dumbbell, Gauge, Route } from 'lucide-react';
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
  { title: 'Trilha de aprendizado', description: 'Sequência sugerida e critérios de domínio.', path: '/LEARNING-PATH.md', icon: Route },
  { title: 'Exercícios', description: 'Enunciados completos da prática guiada.', path: '/EXERCISES.md', icon: Dumbbell },
];
