export interface DocumentChapter {
  title: string;
  description: string;
  path: string;
  icon: string;
}

export const DOCUMENTATION_CHAPTERS: DocumentChapter[] = [
  { title: 'Handbook Angular', description: 'Mapa da tecnologia e competências.', path: 'docs/HANDBOOK.md', icon: 'menu_book' },
  { title: 'Fundamentos e plataforma', description: 'Bootstrap, tooling e renderização.', path: 'docs/01-FUNDAMENTALS.md', icon: 'foundation' },
  { title: 'Componentes e templates', description: 'Bindings, lifecycle e control flow.', path: 'docs/02-COMPONENTS-TEMPLATES.md', icon: 'view_quilt' },
  { title: 'DI, dados e navegação', description: 'Providers, forms, Router e HTTP.', path: 'docs/03-DI-DATA-NAVIGATION.md', icon: 'account_tree' },
  { title: 'Signals, RxJS e estado', description: 'Reatividade, streams e ownership.', path: 'docs/04-SIGNALS-RXJS-STATE.md', icon: 'electric_bolt' },
  { title: 'Qualidade e arquitetura', description: 'Testes, performance e boundaries.', path: 'docs/05-QUALITY-ARCHITECTURE.md', icon: 'verified' },
  { title: 'Trilha de aprendizado', description: 'Sequência sugerida e critérios de domínio.', path: 'docs/LEARNING-PATH.md', icon: 'route' },
  { title: 'Exercícios', description: 'Enunciados completos da prática guiada.', path: 'docs/EXERCISES.md', icon: 'fitness_center' },
];
