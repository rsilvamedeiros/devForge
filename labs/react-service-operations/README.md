# React Service Operations Lab

Central de atendimento construída para praticar React moderno em um domínio diferente do mercado financeiro.

## Produto

O **Nexa Ops** organiza tickets, SLAs, responsáveis e performance operacional.

### Páginas

- visão geral com métricas, fila prioritária e carga da equipe;
- listagem de tickets com busca e filtros;
- detalhe com conversa, cliente, propriedades e atualização de status;
- analytics com volume, canais, satisfação e ranking.

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
- testes de fluxos completos;
- API REST externa;
- autenticação e permissões por papel.
