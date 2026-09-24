# React — rotas e estado remoto

## URL como estado

Rotas representam recursos; params identificam; query parameters representam filtros, ordenação e paginação compartilháveis. Estado que precisa sobreviver a refresh ou link deve considerar a URL.

## Data fetching

Um request exige mais que `fetch`: cancelamento, concorrência, cache, stale data, retry, autenticação, erro e revalidação. Frameworks ou bibliotecas de server state evitam reinventar isso por componente.

## TanStack Query

Query keys descrevem o dado. Inclua todo parâmetro que altera o resultado. Defina `staleTime` pelo negócio, não por palpite.

```ts
useQuery({ queryKey: ['tickets', filters], queryFn: () => api.list(filters) });
```

## Mutations

Após mutation, invalide, atualize cache diretamente ou combine ambos. Optimistic update exige:

1. cancelar refetch concorrente;
2. guardar snapshot;
3. aplicar valor esperado;
4. restaurar em erro;
5. reconciliar com resposta final.

## Consistência

Cache não é banco. O servidor continua fonte autoritativa. Trate conflito, permissão e validação. Não presuma que status HTTP 200 significa payload válido.

## Suspense e boundaries

Suspense coordena espera de recursos compatíveis. Error boundaries capturam erros de renderização abaixo deles; não substituem tratamento de eventos ou requests fora do mecanismo integrado.
