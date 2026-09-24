# React Learning Lab

Plataforma acadêmica do DevForge para dominar React moderno com teoria, trilha progressiva, exercícios e aplicações reais.

## Estudo de caso

O antigo produto **Nexa Ops** permanece como estudo de caso executável para investigar composição, estado remoto, cache, mutations e testes.

### Páginas

- visão geral com métricas, fila prioritária e carga da equipe;
- listagem de tickets com busca e filtros;
- detalhe com conversa, cliente, propriedades e atualização de status;
- analytics com volume, canais, satisfação e ranking.
- trilha React integrada, com módulos, exercícios e progresso local.

## Experiência de aprendizagem

- [`docs/LEARNING-PATH.md`](docs/LEARNING-PATH.md) organiza o projeto em cinco módulos;
- [`docs/EXERCISES.md`](docs/EXERCISES.md) propõe desafios de fundamento, aplicação e arquitetura;
- [`docs/HANDBOOK.md`](docs/HANDBOOK.md) indexa a documentação completa de React;
- a rota `/learning` acompanha módulos sem confundir conclusão com nível de domínio;
- a rota `/curriculum` organiza quinze áreas de competência do fundamento à arquitetura;
- as rotas `/components` e `/playground` oferecem receitas vivas e exercícios executáveis;
- `/coding-arena`, `/technical-qa` e `/assessments` validam prática, comunicação e senioridade;
- `/sandbox` e `/capstone` integram prática multiarquivo e projeto final em seis sprints;
- `/e2e-lab` orienta oito jornadas críticas com riscos e assertions explícitas;
- `/debugging-lab` desenvolve diagnóstico de incidentes do Júnior ao Sênior;
- `/performance-lab` transforma profiling, budgets e otimização em prática mensurável;
- `/skills-report` consolida seis gates em um índice ponderado de domínio;
- `/certificate` libera uma credencial personalizada e imprimível após todas as evidências;
- a documentação permanente da tecnologia fica em [`skills/frontend/react`](../../skills/frontend/react/README.md).

## Skills exercitadas

- componentes funcionais e composição;
- props, estado local e eventos;
- hooks customizados;
- roteamento e parâmetros de URL;
- estado remoto com TanStack Query;
- cache e atualização otimista com rollback;
- renderização de listas com identidade estável;
- loading, erro e empty state;
- tema claro/escuro persistido;
- TypeScript strict;
- testes com Vitest e Testing Library;
- responsividade e acessibilidade.

## Stack

- React 19;
- TypeScript;
- Vite;
- React Router;
- TanStack Query;
- Lucide Icons;
- Vitest + React Testing Library;
- CSS customizado com tokens de tema.

## Estrutura

```text
src/
├── app/            # router, providers e tema
├── components/     # componentes reutilizáveis
├── data/           # massa inicial
├── domain/         # contratos do domínio
├── features/       # hooks e estado remoto por feature
├── layout/         # shell responsivo
├── pages/          # rotas do produto
├── services/       # API simulada
└── test/           # setup de testes
```

## Executar

```bash
npm install
npm run dev
npm run build
npm test
```

Na raiz do DevForge, use `npm run dev:react`, `npm run build:react` e `npm run test:react`.

## Decisões

- Estado derivado permanece em `useMemo`, sem sincronização por `useEffect`.
- Estado remoto pertence ao TanStack Query; busca e filtros locais permanecem no componente.
- A mutation de status atualiza o cache de forma otimista e restaura o valor anterior em caso de falha.
- A API em memória devolve cópias defensivas para evitar mutação acidental do store.
- O tema é uma preocupação transversal isolada em context próprio.

## Próximas evoluções

- criação real de ticket com formulário validado;
- paginação e virtualização;
- filtros sincronizados integralmente com a URL;
- automação dos cenários guiados do E2E Lab com Playwright;
- API REST externa;
- autenticação e permissões por papel.
