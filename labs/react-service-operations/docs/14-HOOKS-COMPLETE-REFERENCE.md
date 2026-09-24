# Hooks React — referência completa

Hooks conectam componentes a recursos do React. Eles devem ser chamados no topo, na mesma ordem, apenas em componentes ou custom hooks.

## useState

Use para estado local independente. Quando a próxima versão depende da anterior, passe uma updater function.

```tsx
const [attempts, setAttempts] = useState(0);
const retry = () => setAttempts(current => current + 1);
```

O initializer pode ser uma função para evitar trabalho em todos os renders.

## useReducer

Centraliza transições relacionadas e torna ações explícitas.

```tsx
type Action =
  | { type: 'query.changed'; query: string }
  | { type: 'filters.cleared' };

function reducer(state: State, action: Action): State {
  switch (action.type) {
    case 'query.changed': return { ...state, query: action.query };
    case 'filters.cleared': return initialState;
  }
}
```

Reducer deve ser puro. Fetch, storage e analytics ficam fora dele.

## useContext

Lê o provider mais próximo. Mudanças no `value` notificam consumidores. Separe contexts por responsabilidade e frequência.

```tsx
const session = useContext(SessionContext);
if (!session) throw new Error('SessionProvider ausente');
```

## useRef

Mantém um valor entre renders sem provocar novo render. Serve para referências DOM, ids de timers e valores imperativos.

```tsx
const inputRef = useRef<HTMLInputElement>(null);
inputRef.current?.focus();
```

Não use ref para esconder estado que deveria aparecer na interface.

## useEffect

Sincroniza com sistemas externos. A estrutura mental é: iniciar sincronização, devolver cleanup e declarar todas as entradas reativas.

```tsx
useEffect(() => {
  const controller = new AbortController();
  loadCourse(id, controller.signal).then(setCourse);
  return () => controller.abort();
}, [id]);
```

Derivação, validação e resposta a clique normalmente não precisam de effect.

## useLayoutEffect

Executa depois da alteração do DOM e antes da pintura. Use para medir layout ou posicionar overlay sem flicker. Como bloqueia pintura, prefira `useEffect` quando possível.

## useMemo

Cacheia resultado de cálculo entre renders. Use após medir custo ou quando estabilidade referencial é parte de outra otimização.

```tsx
const visible = useMemo(
  () => courses.filter(course => matches(course, filters)),
  [courses, filters]
);
```

Não use para corrigir lógica ou como armazenamento semântico.

## useCallback

Cacheia a identidade de uma função, não sua execução. Tem valor quando a função é dependência de hook ou prop de componente memoizado.

## useId

Gera ids estáveis para acessibilidade e SSR. Não deve ser usado como key de listas.

```tsx
const errorId = useId();
<input aria-describedby={hasError ? errorId : undefined} />
```

## useTransition

Marca atualização não urgente e informa se ela ainda está pendente.

```tsx
const [pending, startTransition] = useTransition();
function changeTab(tab: Tab) {
  startTransition(() => setTab(tab));
}
```

O input controlado deve continuar urgente; o conteúdo pesado pode ser transição.

## useDeferredValue

Permite que uma parte custosa da UI fique temporariamente atrás de um valor urgente.

```tsx
const deferredQuery = useDeferredValue(query);
const results = useMemo(() => search(items, deferredQuery), [items, deferredQuery]);
```

Não substitui debounce de rede nem reduz o custo total do cálculo.

## useSyncExternalStore

Assina stores externos com consistência para concorrência e SSR. Bibliotecas de estado devem preferir esta API a subscriptions improvisadas.

## useInsertionEffect

Destina-se principalmente a bibliotecas CSS-in-JS para inserir estilos antes dos effects de layout. Código de produto raramente precisa dele.

## useImperativeHandle

Restringe a API imperativa exposta por uma ref.

```tsx
useImperativeHandle(ref, () => ({
  focus: () => inputRef.current?.focus(),
  clear: () => setValue('')
}), []);
```

Prefira props declarativas; use para integração com foco, mídia ou bibliotecas imperativas.

## useDebugValue

Adiciona um rótulo útil ao React DevTools para custom hooks.

## useOptimistic e useActionState

`useOptimistic` representa a intenção do usuário enquanto uma Action está pendente. `useActionState` organiza resultado, erro e pending de uma Action.

```tsx
const [state, submitAction, pending] = useActionState(saveProfile, initialState);
const [optimisticName, setOptimisticName] = useOptimistic(profile.name);
```

Optimistic UI precisa de estratégia de falha, reconciliação e idempotência.

## use

`use` lê um recurso compatível, como Promise ou Context, e integra a espera com Suspense. Diferente dos demais hooks, pode aparecer em condições, mas continua restrito a componentes e hooks.

## Custom hooks

Um custom hook encapsula uma política reutilizável e oferece contrato focado.

```tsx
function useOnlineStatus() {
  return useSyncExternalStore(subscribe, getSnapshot, () => true);
}
```

Nomeie pelo comportamento, esconda infraestrutura e teste o contrato percebido pelo consumidor.

