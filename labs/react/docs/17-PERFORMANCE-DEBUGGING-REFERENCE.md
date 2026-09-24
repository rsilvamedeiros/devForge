# Performance e debugging — guia de investigação

O objetivo não é eliminar renders; é manter interações responsivas com arquitetura compreensível.

## Método científico

1. Reproduza de forma determinística.
2. Registre baseline.
3. Localize a fase cara.
4. Formule uma hipótese.
5. Faça uma mudança isolada.
6. Meça novamente e documente o trade-off.

## React DevTools Profiler

Investigue duração do commit, componentes renderizados e causa das renderizações. Use CPU throttling para aproximar dispositivos modestos.

Um componente renderizar não significa que o DOM mudou. O custo relevante pode estar no cálculo, reconciliação, layout, pintura ou rede.

## Renderizações inesperadas

Verifique:

- estado alto demais na árvore;
- Context com valor amplo e frequente;
- props com identidade recriada;
- subscription sem seletor;
- effect que escreve estado derivado;
- keys instáveis causando remount.

## memo, useMemo e useCallback

```tsx
const visibleRows = useMemo(() => expensiveFilter(rows, filters), [rows, filters]);
const selectRow = useCallback((id: string) => dispatch({ type: 'selected', id }), []);
return <VirtualTable rows={visibleRows} onSelect={selectRow} />;
```

Essa combinação só ajuda se `VirtualTable` for memoizada, cara e receber dependências realmente estáveis.

## Virtualização

Renderizar 10 mil nós custa mesmo com memo. Virtualização limita DOM à janela visível. Planeje altura, overscan, foco por teclado e busca no conteúdo não montado.

## Bundle

- Divida por rota e feature pesada.
- Analise dependências duplicadas.
- Prefira imports granulares quando a biblioteca não oferece tree shaking adequado.
- Não carregue editor, gráficos ou syntax highlighter antes de serem necessários.

```tsx
const CodeEditor = lazy(() => import('./code-editor'));
```

## Web Vitals

- LCP: prioridade e tempo do maior conteúdo visível.
- INP: latência das interações durante toda a visita.
- CLS: estabilidade do layout.

React é apenas parte da equação. Imagens, fontes, CSS, servidor e scripts de terceiros também importam.

## Concorrência

Transitions e deferred values preservam atualizações urgentes, mas não tornam cálculos gratuitos.

```tsx
const [pending, startTransition] = useTransition();
function applyFilter(next: Filter) {
  startTransition(() => setFilter(next));
}
```

## Cache de servidor

Defina `staleTime` pela volatilidade do domínio. Cache infinito pode exibir dado incorreto; refetch constante destrói responsividade e rede.

## Debugging de effects

Para cada effect, responda:

1. Qual sistema externo está sendo sincronizado?
2. Qual evento inicia e encerra essa sincronização?
3. O cleanup desfaz tudo?
4. Cada dependência é honesta?

Se não existe sistema externo, remova o effect e derive ou responda no event handler.

## Stale closure

Cada render possui seu snapshot. Callbacks assíncronos enxergam o render em que foram criados. Use updater function quando depender do valor anterior; use ref apenas quando realmente precisar do valor mais recente sem render.

## Race conditions

Requests podem terminar fora de ordem. Cancele, ignore respostas obsoletas ou use uma camada de server state que associe resultado à query key.

```tsx
useEffect(() => {
  const controller = new AbortController();
  search(query, controller.signal).then(setResults).catch(handleAbort);
  return () => controller.abort();
}, [query]);
```

## Hydration

Hora atual, aleatoriedade, locale diferente e acesso ao navegador durante o primeiro render geram divergência. O HTML inicial precisa ser determinístico.

## Orçamento recomendado

Defina por produto, não como número universal:

- limite de JavaScript inicial;
- meta de INP no dispositivo de referência;
- quantidade máxima de elementos por lista;
- regressão tolerada por pull request;
- rotas que exigem prefetch.

Use os laboratórios `/debugging-lab` e `/performance-lab` para praticar o método.

