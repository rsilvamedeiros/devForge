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
  },
  {
    slug: 'react-service-operations',
    title: 'React Service Operations',
    description: 'Central de atendimento com tickets, SLA, estado remoto e atualização otimista.',
    stack: 'React · TypeScript · TanStack Query',
    status: 'active',
    skills: ['react', 'typescript', 'rest', 'performance'],
    contentPath: 'content/labs/react-service-operations/README.md',
  },
  {
    slug: 'typescript-order-processing',
    title: 'TypeScript Order Processing',
    description: 'Pipeline orientado a eventos com idempotência, retry, DLQ e observabilidade.',
    stack: 'Node.js · TypeScript · Vitest',
    status: 'foundation',
    vacancySlug: 'btg-digital-equities',
    skills: ['typescript', 'oop', 'solid', 'queues-messaging', 'architecture'],
    contentPath: 'content/labs/typescript-order-processing/README.md',
  },
];
