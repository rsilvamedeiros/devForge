# Receitas de produção com React

Receitas são pontos de partida. Adapte ownership, erros e políticas ao domínio.

## Fetch com estados explícitos

```tsx
function CoursePage({ id }: { id: string }) {
  const query = useQuery({
    queryKey: ['course', id],
    queryFn: ({ signal }) => api.course(id, signal),
    staleTime: 60_000
  });

  if (query.isPending) return <CourseSkeleton />;
  if (query.isError) return <ErrorState retry={query.refetch} />;
  return <CourseDetails course={query.data} />;
}
```

A query key deve descrever completamente o recurso. Loading inicial e refetch em background são experiências distintas.

## Mutation otimista

```tsx
const mutation = useMutation({
  mutationFn: toggleLesson,
  onMutate: async input => {
    await client.cancelQueries({ queryKey: ['course', input.courseId] });
    const previous = client.getQueryData<Course>(['course', input.courseId]);
    client.setQueryData(['course', input.courseId], current => applyToggle(current, input));
    return { previous };
  },
  onError: (_error, input, context) => {
    client.setQueryData(['course', input.courseId], context?.previous);
  },
  onSettled: (_data, _error, input) => {
    client.invalidateQueries({ queryKey: ['course', input.courseId] });
  }
});
```

Avalie concorrência, idempotência e impacto de rollback antes de adotar.

## Estado na URL

```tsx
const [params, setParams] = useSearchParams();
const query = params.get('q') ?? '';
function changeQuery(next: string) {
  setParams(current => {
    const updated = new URLSearchParams(current);
    next ? updated.set('q', next) : updated.delete('q');
    return updated;
  }, { replace: true });
}
```

Filtros compartilháveis, paginação e seleção de aba frequentemente pertencem à URL.

## Reducer com Context dividido

```tsx
const StateContext = createContext<State | null>(null);
const DispatchContext = createContext<Dispatch<Action> | null>(null);

function EditorProvider({ children }: PropsWithChildren) {
  const [state, dispatch] = useReducer(editorReducer, initialState);
  return <StateContext value={state}><DispatchContext value={dispatch}>{children}</DispatchContext></StateContext>;
}
```

Separar state e dispatch evita que consumidores apenas de dispatch renderizem por toda mudança.

## Modal acessível

Um modal completo precisa de portal, `role="dialog"`, nome acessível, foco inicial, contenção, Escape, devolução de foco e bloqueio de scroll.

```tsx
createPortal(
  <div className="backdrop" onMouseDown={close}>
    <section role="dialog" aria-modal="true" aria-labelledby={titleId} onMouseDown={stopPropagation}>
      <h2 id={titleId}>{title}</h2>
      {children}
    </section>
  </div>,
  overlayRoot
);
```

Use uma biblioteca testada quando o custo de implementar todos os detalhes não se justificar.

## Toast

Use `role="status"` para confirmação não urgente e `role="alert"` para falha que exige atenção. Não coloque a única explicação de erro em uma mensagem que desaparece.

## Debounce de request

```tsx
useEffect(() => {
  const timer = window.setTimeout(() => setCommittedQuery(query), 300);
  return () => window.clearTimeout(timer);
}, [query]);
```

Mantenha o input imediato. Debounce controla efeito externo; `useDeferredValue` controla prioridade de renderização.

## Infinite scroll

Ofereça alternativa navegável, preserve posição, anuncie novos resultados e evite prender o usuário sem acesso ao footer. Paginação explícita pode ser melhor para busca e retorno.

## Feature flags

```tsx
const enabled = useFeatureFlag('new-checkout');
return enabled ? <NewCheckout /> : <LegacyCheckout />;
```

Flags precisam de owner, data de remoção, observabilidade e testes dos dois caminhos.

## Autorização

Esconder botão melhora UX, mas não protege operação. Toda autorização deve ser validada no servidor.

## Observabilidade

Capture boundary, rota, release e contexto seguro. Nunca envie token, senha ou conteúdo sensível ao telemetry.

```tsx
reportError(error, {
  feature: 'enrollment',
  route: location.pathname,
  release: APP_VERSION
});
```

## Checklist de pull request

- Estados de loading, erro, vazio e sucesso existem?
- Navegação por teclado foi exercitada?
- Requests podem ser cancelados ou ficar obsoletos?
- Cache e invalidação refletem o domínio?
- Bundle ou render pioraram?
- Logs evitam dados sensíveis?
- Há testes no nível correto?
- A decisão complexa foi documentada?

