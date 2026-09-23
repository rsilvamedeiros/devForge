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
  { title: 'Formulários', description: 'Reactive Forms, validação e controles customizados.', path: 'docs/06-FORMS.md', icon: 'edit_note' },
  { title: 'Router e HTTP', description: 'Navegação, guards, resolvers e acesso a dados.', path: 'docs/07-ROUTER-HTTP.md', icon: 'route' },
  { title: 'Testes', description: 'Estratégia, TestBed, harnesses e HTTP testing.', path: 'docs/08-TESTING.md', icon: 'science' },
  { title: 'Performance e segurança', description: 'Rendering, bundle, XSS e fronteiras de confiança.', path: 'docs/09-PERFORMANCE-SECURITY.md', icon: 'speed' },
  { title: 'SSR e tooling', description: 'Hydration, prerender, build e operação.', path: 'docs/10-SSR-TOOLING.md', icon: 'public' },
  { title: 'Trilha de aprendizado', description: 'Sequência sugerida e critérios de domínio.', path: 'docs/LEARNING-PATH.md', icon: 'route' },
  { title: 'Exercícios', description: 'Enunciados completos da prática guiada.', path: 'docs/EXERCISES.md', icon: 'fitness_center' },
  { title: 'Avaliações técnicas', description: 'Provinhas, simulados e critérios por senioridade.', path: 'docs/11-TECHNICAL-ASSESSMENTS.md', icon: 'assignment_turned_in' },
  { title: 'Diretivas e pipes', description: 'Comportamento reutilizável, transformação e composição.', path: 'docs/12-DIRECTIVES-PIPES.md', icon: 'extension' },
  { title: 'Lifecycle e rendering', description: 'Hooks, change detection, queries e render callbacks.', path: 'docs/13-LIFECYCLE-RENDERING.md', icon: 'cycle' },
  { title: 'Composição avançada', description: 'Projection, templates e componentes dinâmicos.', path: 'docs/14-ADVANCED-COMPOSITION.md', icon: 'dashboard_customize' },
  { title: 'Acessibilidade e i18n', description: 'Semântica, teclado, ARIA, locale e tradução.', path: 'docs/15-ACCESSIBILITY-I18N.md', icon: 'accessibility_new' },
  { title: 'Libraries e workspaces', description: 'APIs públicas, packaging, monorepos e design systems.', path: 'docs/16-LIBRARIES-WORKSPACES.md', icon: 'inventory_2' },
  { title: 'Debugging e operação', description: 'DevTools, erros, observabilidade, deploy e upgrades.', path: 'docs/17-DEBUGGING-OPERATIONS.md', icon: 'troubleshoot' },
];
