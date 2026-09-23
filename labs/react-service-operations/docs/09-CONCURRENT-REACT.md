# React concorrente e responsividade

## Prioridades, não paralelismo mágico

O renderer pode interromper e descartar trabalho antes do commit. Componentes e hooks precisam permanecer puros porque um render iniciado pode nunca chegar ao DOM.

## Transitions

`startTransition` marca uma atualização não urgente. O input continua responsivo enquanto uma lista ou navegação mais cara é preparada.

```tsx
const [isPending, startTransition] = useTransition();
startTransition(() => setQuery(nextQuery));
```

`useDeferredValue` permite que uma parte da UI acompanhe um valor com menor prioridade. Ele não substitui debounce de rede.

## Suspense

Suspense coordena loading declarativo quando a fonte de dados ou código integra com o mecanismo. Posicione boundaries de acordo com a experiência desejada, evitando trocar toda a página por um spinner.

## Optimistic UI

`useOptimistic` ajuda a apresentar a intenção antes da confirmação. Ainda são necessárias política de erro, reconciliação e acessibilidade do feedback.

## Evidência

Use o Profiler para comparar uma busca pesada antes e depois de uma transition; registre latência percebida e renders, não apenas opinião.
