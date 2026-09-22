import {
  ChallengeItem,
  LabItem,
  SkillCategory,
  SkillItem,
  StudyPlanItem,
  VacancyItem,
} from '../models/content.model';

type SkillDefinition = Omit<SkillItem, 'currentLevel' | 'targetLevel' | 'evidenceCount'>;

export const SKILL_CATEGORY_LABELS: Record<SkillCategory, string> = {
  'computer-science': 'Ciência da Computação',
  frontend: 'Frontend',
  'software-engineering': 'Engenharia de Software',
};

const SKILL_DEFINITIONS: SkillDefinition[] = [
  {
    slug: 'algorithms-big-o',
    title: 'Algorithms & Big O',
    category: 'computer-science',
    contentPath: 'content/skills/computer-science/algorithms-big-o/README.md',
  },
  {
    slug: 'arrays-lists',
    title: 'Arrays & Lists',
    category: 'computer-science',
    contentPath: 'content/skills/computer-science/arrays-lists/README.md',
  },
  {
    slug: 'data-structures',
    title: 'Data Structures',
    category: 'computer-science',
    contentPath: 'content/skills/computer-science/data-structures/README.md',
  },
  {
    slug: 'angular',
    title: 'Angular',
    category: 'frontend',
    contentPath: 'content/skills/frontend/angular/README.md',
  },
  {
    slug: 'performance',
    title: 'Frontend Performance',
    category: 'frontend',
    contentPath: 'content/skills/frontend/performance/README.md',
  },
  {
    slug: 'react',
    title: 'React',
    category: 'frontend',
    contentPath: 'content/skills/frontend/react/README.md',
  },
  {
    slug: 'rest',
    title: 'REST',
    category: 'frontend',
    contentPath: 'content/skills/frontend/rest/README.md',
  },
  {
    slug: 'rxjs',
    title: 'RxJS',
    category: 'frontend',
    contentPath: 'content/skills/frontend/rxjs/README.md',
  },
  {
    slug: 'typescript',
    title: 'TypeScript para entrevista',
    category: 'frontend',
    contentPath: 'content/skills/frontend/typescript/README.md',
  },
  {
    slug: 'websockets',
    title: 'WebSockets',
    category: 'frontend',
    contentPath: 'content/skills/frontend/websockets/README.md',
  },
  {
    slug: 'architecture',
    title: 'Architecture / System Design',
    category: 'software-engineering',
    contentPath: 'content/skills/software-engineering/architecture/README.md',
  },
  {
    slug: 'oop',
    title: 'OOP em TypeScript',
    category: 'software-engineering',
    contentPath: 'content/skills/software-engineering/oop/README.md',
  },
  {
    slug: 'queues-messaging',
    title: 'Queues & Messaging',
    category: 'software-engineering',
    contentPath: 'content/skills/software-engineering/queues-messaging/README.md',
  },
  {
    slug: 'solid',
    title: 'SOLID',
    category: 'software-engineering',
    contentPath: 'content/skills/software-engineering/solid/README.md',
  },
];

export const SKILLS: SkillItem[] = SKILL_DEFINITIONS.map(skill => ({
  ...skill,
  currentLevel: null,
  targetLevel: null,
  evidenceCount: 0,
}));

export const CHALLENGES: ChallengeItem[] = [
  {
    slug: 'frequency-counter',
    title: 'Frequency Counter',
    category: 'arrays',
    contentPath: 'content/challenges/arrays/01-frequency-counter.md',
  },
  {
    slug: 'two-sum',
    title: 'Two Sum',
    category: 'arrays',
    contentPath: 'content/challenges/arrays/02-two-sum.md',
  },
  {
    slug: 'orders-by-ticker',
    title: 'Volume por ticker',
    category: 'arrays',
    contentPath: 'content/challenges/arrays/03-orders-by-ticker.md',
  },
  {
    slug: 'live-coding-checklist',
    title: 'Checklist Live Coding',
    category: 'live-coding',
    contentPath: 'content/challenges/live-coding/CHECKLIST.md',
  },
  {
    slug: 'rock-paper-scissors',
    title: 'Jokenpô evolutivo',
    category: 'oop',
    contentPath: 'content/challenges/oop/01-rock-paper-scissors.md',
  },
  {
    slug: 'order-processing',
    title: 'System Design — processamento de ordens',
    category: 'system-design',
    contentPath: 'content/challenges/system-design/01-order-processing.md',
  },
];

export const VACANCIES: VacancyItem[] = [
  {
    slug: 'btg-digital-equities',
    title: 'Engenheiro de Software Frontend (Angular) | Digital Equities',
    company: 'BTG Pactual',
    contentPath: 'content/vacancies/btg-digital-equities/README.md',
    requirementsPath: 'content/vacancies/btg-digital-equities/REQUIREMENTS.md',
    interviewPrepPath: 'content/vacancies/btg-digital-equities/INTERVIEW-PREP.md',
  },
];

export const STUDY_PLANS: StudyPlanItem[] = [
  {
    slug: 'btg-2-dias',
    title: 'Plano intensivo — BTG — 2 dias',
    contentPath: 'content/study-plans/BTG-2-DIAS.md',
  },
];

export const LABS: LabItem[] = [
  {
    slug: 'angular-digital-equities',
    title: 'Angular Digital Equities',
    description: 'Terminal de renda variável para integrar Angular, estado, RxJS, filas e real time.',
    stack: 'Angular · TypeScript · RxJS',
    status: 'active',
    vacancySlug: 'btg-digital-equities',
    skills: ['angular', 'typescript', 'rxjs', 'queues-messaging', 'websockets', 'performance'],
    contentPath: 'content/labs/angular-digital-equities/README.md',
    learningPath: 'content/labs/angular-digital-equities/docs/LEARNING-PATH.md',
    exercisesPath: 'content/labs/angular-digital-equities/docs/EXERCISES.md',
    documentation: [
      { title: 'Handbook Angular', description: 'Mapa completo da tecnologia e competências esperadas.', contentPath: 'content/labs/angular-digital-equities/docs/HANDBOOK.md' },
      { title: 'Fundamentos e plataforma', description: 'Bootstrap, workspace, estrutura e renderização.', contentPath: 'content/labs/angular-digital-equities/docs/01-FUNDAMENTALS.md' },
      { title: 'Componentes e templates', description: 'Bindings, control flow, lifecycle e acessibilidade.', contentPath: 'content/labs/angular-digital-equities/docs/02-COMPONENTS-TEMPLATES.md' },
      { title: 'DI, dados e navegação', description: 'Providers, forms, Router, HttpClient e segurança.', contentPath: 'content/labs/angular-digital-equities/docs/03-DI-DATA-NAVIGATION.md' },
      { title: 'Signals, RxJS e estado', description: 'Reatividade, streams, cleanup e ownership.', contentPath: 'content/labs/angular-digital-equities/docs/04-SIGNALS-RXJS-STATE.md' },
      { title: 'Qualidade e arquitetura', description: 'Testes, performance, boundaries e observabilidade.', contentPath: 'content/labs/angular-digital-equities/docs/05-QUALITY-ARCHITECTURE.md' },
    ],
    modules: [
      { title: 'Componentes e navegação', focus: 'Standalone · Material · Router', status: 'implemented' },
      { title: 'Signals e estado derivado', focus: 'Signals · computed · OnPush', status: 'implemented' },
      { title: 'Formulários e domínio', focus: 'Reactive Forms · POO · Queue', status: 'implemented' },
      { title: 'HTTP e tempo real', focus: 'HttpClient · RxJS · WebSocket', status: 'implemented' },
      { title: 'Risco, performance e testes', focus: 'Guardrails · Specs · Evidência', status: 'implemented' },
    ],
  },
  {
    slug: 'react-service-operations',
    title: 'React Service Operations',
    description: 'Central de atendimento com tickets, SLA, estado remoto e atualização otimista.',
    stack: 'React · TypeScript · TanStack Query',
    status: 'active',
    skills: ['react', 'typescript', 'rest', 'performance'],
    contentPath: 'content/labs/react-service-operations/README.md',
    learningPath: 'content/labs/react-service-operations/docs/LEARNING-PATH.md',
    exercisesPath: 'content/labs/react-service-operations/docs/EXERCISES.md',
    documentation: [
      { title: 'Handbook React', description: 'Mapa completo da tecnologia e competências esperadas.', contentPath: 'content/labs/react-service-operations/docs/HANDBOOK.md' },
      { title: 'Fundamentos e composição', description: 'JSX, components, props, identidade e renderização.', contentPath: 'content/labs/react-service-operations/docs/01-FUNDAMENTALS-COMPOSITION.md' },
      { title: 'Estado, hooks e formulários', description: 'Ownership, effects, refs, context e entrada.', contentPath: 'content/labs/react-service-operations/docs/02-STATE-HOOKS-FORMS.md' },
      { title: 'Rotas e estado remoto', description: 'URL, cache, mutations, rollback e boundaries.', contentPath: 'content/labs/react-service-operations/docs/03-ROUTING-SERVER-STATE.md' },
      { title: 'Arquitetura e experiência', description: 'Features, acessibilidade, styling e design system.', contentPath: 'content/labs/react-service-operations/docs/04-ARCHITECTURE-UX.md' },
      { title: 'Qualidade e performance', description: 'Testes, profiling, concorrência e segurança.', contentPath: 'content/labs/react-service-operations/docs/05-QUALITY-PERFORMANCE.md' },
    ],
    modules: [
      { title: 'Composição da interface', focus: 'Components · Props · Router', status: 'implemented' },
      { title: 'Estado e filtros', focus: 'useState · useMemo · URL', status: 'implemented' },
      { title: 'Estado remoto', focus: 'TanStack Query · Cache', status: 'implemented' },
      { title: 'Mutations resilientes', focus: 'Optimistic update · Rollback', status: 'implemented' },
      { title: 'Qualidade e arquitetura', focus: 'Vitest · RTL · Trade-offs', status: 'implemented' },
    ],
  },
  {
    slug: 'typescript-order-processing',
    title: 'TypeScript Order Processing',
    description: 'Pipeline orientado a eventos com idempotência, retry, DLQ e observabilidade.',
    stack: 'Node.js · TypeScript · Vitest',
    status: 'active',
    vacancySlug: 'btg-digital-equities',
    skills: ['typescript', 'oop', 'solid', 'queues-messaging', 'architecture'],
    contentPath: 'content/labs/typescript-order-processing/README.md',
    learningPath: 'content/labs/typescript-order-processing/docs/LEARNING-PATH.md',
    exercisesPath: 'content/labs/typescript-order-processing/docs/EXERCISES.md',
    documentation: [
      { title: 'Handbook TypeScript', description: 'Mapa completo da linguagem e competências esperadas.', contentPath: 'content/labs/typescript-order-processing/docs/HANDBOOK.md' },
      { title: 'Sistema de tipos e narrowing', description: 'Inferência, unions, guards, nullability e never.', contentPath: 'content/labs/typescript-order-processing/docs/01-TYPE-SYSTEM-NARROWING.md' },
      { title: 'Funções, generics e utilities', description: 'Constraints, keyof, mapped e conditional types.', contentPath: 'content/labs/typescript-order-processing/docs/02-FUNCTIONS-GENERICS-UTILITIES.md' },
      { title: 'Objetos, classes e módulos', description: 'Structural typing, composição, ESM e APIs públicas.', contentPath: 'content/labs/typescript-order-processing/docs/03-OBJECTS-CLASSES-MODULES.md' },
      { title: 'Async, erros e runtime', description: 'Promise, unknown, validação, cancelamento e concorrência.', contentPath: 'content/labs/typescript-order-processing/docs/04-ASYNC-ERRORS-RUNTIME.md' },
      { title: 'Configuração e arquitetura', description: 'tsconfig, build, testes, performance e boundaries.', contentPath: 'content/labs/typescript-order-processing/docs/05-CONFIG-QUALITY-ARCHITECTURE.md' },
    ],
    modules: [
      { title: 'Modelagem e contratos', focus: 'Unions · Interfaces · Generics', status: 'implemented' },
      { title: 'Processamento e idempotência', focus: 'DI · At-least-once', status: 'implemented' },
      { title: 'Retry e DLQ', focus: 'Failures · Attempts · Isolation', status: 'implemented' },
      { title: 'Observabilidade visual', focus: 'Metrics · Event log · Simulation', status: 'implemented' },
      { title: 'Evolução distribuída', focus: 'Inbox/outbox · Partitions', status: 'next' },
    ],
  },
];
