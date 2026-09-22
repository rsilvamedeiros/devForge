# React — qualidade e performance

## Testes

Testing Library consulta a UI como usuário: role, label e texto. Teste comportamento, não estado interno. Mocke a fronteira externa mínima; excesso de mocks cria testes que não representam o sistema.

- unitário: funções e domínio;
- componente: interação e acessibilidade;
- integração: Router, providers, cache e API simulada;
- E2E: jornadas críticas.

## Performance

Use React DevTools Profiler. Descubra componente caro, frequência e causa antes de aplicar `memo`, `useMemo` ou `useCallback`.

Memoização tem custo e depende de identidade estável. Para listas enormes, considere paginação/virtualização. Divida bundles por rota e adie funcionalidades não críticas.

## Concorrência

`startTransition` marca atualização não urgente; `useDeferredValue` permite UI responsiva durante derivação cara. Eles não tornam algoritmo mais rápido e não substituem debounce de rede.

## Segurança

Escape padrão do React reduz XSS, mas URLs, HTML explícito e dependências ainda exigem validação. Autorização pertence ao servidor. Nunca coloque segredo no bundle.

## Entrevista

Consiga explicar renderização, reconciliation, key, state ownership, effect/cleanup, context, server state, optimistic update, boundaries, testes e uma otimização baseada em profiling.
