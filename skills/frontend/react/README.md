# React

## Objetivo

Construir interfaces componentizadas, acessíveis e previsíveis usando React moderno e TypeScript.

## Nível atual
`Não avaliado`

Nenhum nível atribuído sem evidência registrada.

## Nível alvo
`A definir por vaga`

## Fundamentos

- componentes funcionais;
- props e composição;
- estado e eventos;
- hooks;
- renderização condicional e listas;
- formulários;
- roteamento;
- estado remoto;
- acessibilidade;
- testes de comportamento.

## Mapa completo de domínio

### Renderização

- JSX, elements, components e purity;
- reconciliation, identidade, keys e preservação de estado;
- composição, children, controlled/uncontrolled e events;
- conditional rendering, lists, portals e error boundaries.

### Estado e hooks

- `useState`, `useReducer`, `useRef`, `useContext` e custom hooks;
- state ownership, derivação e imutabilidade;
- effects, dependências, cleanup e sincronização externa;
- transitions, deferred values e APIs modernas do React.

### Aplicação

- Router, params, URL state e code splitting;
- forms, validação, foco e acessibilidade;
- data fetching, cache, server state e mutations;
- optimistic update, rollback e consistência;
- styling, tokens, tema e design system.

### Produção

- Testing Library, integração e E2E;
- Profiler, memoização e virtualização;
- boundaries por feature e adapters;
- SSR, streaming, hydration e limites de uma SPA;
- segurança, observabilidade e tratamento de falhas.

## Handbook do laboratório

- [Visão geral](../../../labs/react/docs/HANDBOOK.md)
- [Fundamentos e composição](../../../labs/react/docs/01-FUNDAMENTALS-COMPOSITION.md)
- [Estado, hooks e formulários](../../../labs/react/docs/02-STATE-HOOKS-FORMS.md)
- [Rotas e estado remoto](../../../labs/react/docs/03-ROUTING-SERVER-STATE.md)
- [Arquitetura e experiência](../../../labs/react/docs/04-ARCHITECTURE-UX.md)
- [Qualidade e performance](../../../labs/react/docs/05-QUALITY-PERFORMANCE.md)

## Quando usar

- interfaces com composição flexível;
- ecossistemas que adotam React;
- aplicações que precisam compartilhar padrões entre web e outras plataformas.

## Quando não usar

- páginas estáticas simples sem interatividade relevante;
- quando o time já possui outra stack consolidada e a troca não resolve um problema real.

## Exemplos

O lab `labs/react` transforma React em uma formação acadêmica completa, mantendo a central de atendimento como um dos estudos de caso.

## Complexidade / performance

- preservar identidade em listas com `key` estável;
- evitar estado duplicado;
- medir antes de aplicar memoização;
- separar estado local de estado remoto;
- observar custo de renderização em listas extensas.

## Trade-offs

- flexibilidade exige decisões explícitas de arquitetura;
- ecossistema amplo aumenta opções e custo de padronização;
- renderização no cliente é simples, mas pode exigir um framework para SSR e streaming.

## Exercícios

- filtrar e ordenar tickets sem mutação;
- criar formulário controlado;
- implementar atualização otimista com rollback;
- testar loading, erro, empty state e sucesso.

## Perguntas de entrevista

- estado vs props?
- controlled vs uncontrolled components?
- quando usar `useEffect`?
- por que uma `key` estável importa?
- estado local vs servidor?
- quando `useMemo` não ajuda?

## Erros comuns

- sincronizar estado derivado com `useEffect`;
- usar índice como `key` em listas mutáveis;
- buscar dados sem tratar cancelamento, erro e cache;
- memoizar tudo sem medição.

## Aplicação real

- `labs/react`.

## Gaps conhecidos

- avaliação de domínio pendente.
- SSR, streaming e hydration ainda não aplicados no lab;
- exercício de lista massiva ainda sem medição;
- exercícios avançados ainda aguardam solução e retrospectiva.

## Evidências de domínio

- nenhuma evidência registrada.

## Recursos

- documentação oficial do React;
- documentação do React Router;
- documentação do TanStack Query.
