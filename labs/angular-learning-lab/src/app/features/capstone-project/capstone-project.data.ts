export interface CapstoneTask {
  id: string;
  title: string;
  description: string;
  evidence: string;
}

export interface CapstoneSprint {
  id: string;
  number: number;
  title: string;
  objective: string;
  icon: string;
  skills: string[];
  tasks: CapstoneTask[];
}

export const CAPSTONE_SPRINTS: CapstoneSprint[] = [
  {
    id: 'foundation', number: 1, title: 'Fundação e arquitetura', icon: 'account_tree',
    objective: 'Defina boundaries, contratos e decisões antes de construir telas.',
    skills: ['workspace', 'standalone', 'lazy loading', 'ADRs'],
    tasks: [
      { id: 'architecture', title: 'Desenhar a arquitetura por features', description: 'Separe core, shared e features sem criar um shared genérico.', evidence: 'Diagrama e árvore de pastas comentada.' },
      { id: 'routes', title: 'Configurar rotas lazy', description: 'Crie shell, páginas e uma rota 404 com carregamento sob demanda.', evidence: 'Routes tipadas e chunks separados no build.' },
      { id: 'adr', title: 'Registrar decisões', description: 'Documente ownership de estado, estratégia de dados e fronteiras.', evidence: 'Ao menos dois ADRs com contexto e trade-offs.' },
    ],
  },
  {
    id: 'identity', number: 2, title: 'Identidade e acesso', icon: 'shield_person',
    objective: 'Modele autenticação simulada, sessão e autorização sem acoplar a interface.',
    skills: ['DI', 'guards', 'interceptors', 'permissions'],
    tasks: [
      { id: 'session', title: 'Criar fluxo de sessão', description: 'Modele usuário, login, logout e restauração segura da sessão.', evidence: 'Service testável com estado explícito.' },
      { id: 'access', title: 'Proteger rotas e ações', description: 'Use guards funcionais e políticas de permissão reutilizáveis.', evidence: 'Testes cobrindo acesso permitido e negado.' },
      { id: 'auth-http', title: 'Integrar autenticação ao HTTP', description: 'Adicione credencial simulada e trate expiração em interceptor funcional.', evidence: 'Teste com HttpTestingController.' },
    ],
  },
  {
    id: 'data', number: 3, title: 'Dados e estado', icon: 'database',
    objective: 'Implemente uma lista de cursos com detalhe, filtros e estados assíncronos.',
    skills: ['HttpClient', 'RxJS', 'Signals', 'cache'],
    tasks: [
      { id: 'repository', title: 'Criar camada de dados', description: 'Isole transporte, DTOs e transformação para o domínio da UI.', evidence: 'Contrato de repository e tratamento de erros.' },
      { id: 'request-state', title: 'Modelar estados de request', description: 'Exiba loading, sucesso, vazio, erro e retry sem booleanos conflitantes.', evidence: 'Demonstração de todos os estados.' },
      { id: 'filters', title: 'Construir busca e filtros', description: 'Combine Signals para estado síncrono e RxJS para concorrência assíncrona.', evidence: 'Filtro derivado sem estado duplicado.' },
    ],
  },
  {
    id: 'forms', number: 4, title: 'Formulários e experiência', icon: 'dynamic_form',
    objective: 'Construa uma matrícula acessível com regras reais e feedback claro.',
    skills: ['typed forms', 'CVA', 'a11y', 'validation'],
    tasks: [
      { id: 'typed-form', title: 'Modelar formulário tipado', description: 'Implemente validações síncronas, assíncronas e cruzadas.', evidence: 'Form sem casts e testes dos validadores.' },
      { id: 'custom-control', title: 'Criar um controle reutilizável', description: 'Implemente um CVA acessível para seleção de modalidade.', evidence: 'Controle integrado e navegável por teclado.' },
      { id: 'feedback', title: 'Tratar envio e feedback', description: 'Proteja contra duplo envio e preserve contexto em caso de erro.', evidence: 'Estados pending, success e error demonstráveis.' },
    ],
  },
  {
    id: 'quality', number: 5, title: 'Qualidade e performance', icon: 'verified',
    objective: 'Torne comportamento, acessibilidade e orçamento de performance verificáveis.',
    skills: ['unit tests', 'harnesses', 'OnPush', '@defer'],
    tasks: [
      { id: 'tests', title: 'Cobrir fluxos críticos', description: 'Teste domínio, componentes, Router e HTTP pelo comportamento observável.', evidence: 'Suíte verde com cenários de falha.' },
      { id: 'performance', title: 'Medir e otimizar', description: 'Use DevTools, track, lazy loading e @defer onde houver evidência.', evidence: 'Comparação antes/depois e budget aprovado.' },
      { id: 'accessibility', title: 'Auditar acessibilidade', description: 'Revise semântica, foco, teclado, contraste e anúncios de estado.', evidence: 'Checklist WCAG com correções registradas.' },
    ],
  },
  {
    id: 'delivery', number: 6, title: 'Entrega e defesa técnica', icon: 'rocket_launch',
    objective: 'Prepare uma entrega reproduzível e defenda as decisões como pessoa sênior.',
    skills: ['build', 'SSR', 'observability', 'review'],
    tasks: [
      { id: 'production', title: 'Preparar produção', description: 'Configure environments, error handler, logging e build otimizado.', evidence: 'Build limpo com instruções reproduzíveis.' },
      { id: 'rendering', title: 'Definir estratégia de rendering', description: 'Justifique CSR, SSR ou SSG e aplique hydration quando fizer sentido.', evidence: 'Decisão documentada com riscos.' },
      { id: 'defense', title: 'Realizar defesa técnica', description: 'Apresente arquitetura, trade-offs, métricas e próximos passos em 10 minutos.', evidence: 'Roteiro de apresentação e retrospectiva.' },
    ],
  },
];

export const CAPSTONE_TASK_COUNT = CAPSTONE_SPRINTS.reduce((total, sprint) => total + sprint.tasks.length, 0);
