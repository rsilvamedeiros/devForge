export type RecipeKind='counter'|'accordion'|'tabs'|'form'|'filter'|'reducer';
export interface ComponentRecipe{id:string;title:string;category:string;level:string;description:string;kind:RecipeKind;concepts:string[];code:string}
export const COMPONENT_RECIPES:ComponentRecipe[]=[
{id:'controlled-counter',title:'Controlled Counter',category:'Estado',level:'Júnior',description:'Fluxo de dados explícito entre valor e eventos.',kind:'counter',concepts:['props','events','controlled'],code:`function Counter({ value, onChange }) {
  return <button onClick={() => onChange(value + 1)}>{value}</button>;
}`},
{id:'derived-filter',title:'Derived Filter',category:'Estado',level:'Júnior',description:'Lista filtrada durante o render, sem effect.',kind:'filter',concepts:['useState','derived state','lists'],code:`const visible = products.filter(product =>
  product.name.toLowerCase().includes(query.toLowerCase())
);`},
{id:'accessible-accordion',title:'Accessible Accordion',category:'Composição',level:'Júnior',description:'Disclosure semântica com estado mínimo.',kind:'accordion',concepts:['ARIA','conditional render','identity'],code:`<button aria-expanded={open} onClick={() => setOpen(v => !v)}>
  Detalhes
</button>
{open && <section>Conteúdo acessível</section>}`},
{id:'compound-tabs',title:'Compound Tabs',category:'Composição',level:'Pleno',description:'API composta para coordenar gatilhos e painéis.',kind:'tabs',concepts:['children','Context','compound components'],code:`<Tabs defaultValue="preview">
  <Tabs.List><Tabs.Trigger value="preview">Preview</Tabs.Trigger></Tabs.List>
  <Tabs.Panel value="preview">...</Tabs.Panel>
</Tabs>`},
{id:'typed-form',title:'Typed Form',category:'Forms',level:'Pleno',description:'Entrada controlada, validação e feedback acessível.',kind:'form',concepts:['form state','validation','focus'],code:`const [email, setEmail] = useState('');
const error = email && !email.includes('@') ? 'E-mail inválido' : '';
<input aria-invalid={!!error} value={email} onChange={e => setEmail(e.target.value)} />`},
{id:'reducer-workflow',title:'Reducer Workflow',category:'Hooks',level:'Pleno',description:'Transições explícitas para fluxo com múltiplos eventos.',kind:'reducer',concepts:['useReducer','actions','pure reducer'],code:`function reducer(state, action) {
  if (action.type === 'advance') return { ...state, step: state.step + 1 };
  if (action.type === 'reset') return initialState;
  return state;
}`},
{id:'effect-cleanup',title:'Effect Cleanup',category:'Hooks',level:'Pleno',description:'Subscription externa com teardown simétrico.',kind:'accordion',concepts:['useEffect','cleanup','external system'],code:`useEffect(() => {
  const unsubscribe = store.subscribe(sync);
  return unsubscribe;
}, [store]);`},
{id:'stable-context',title:'Stable Context',category:'Arquitetura',level:'Sênior',description:'Provider com contrato pequeno e value estável.',kind:'counter',concepts:['Context','useMemo','boundaries'],code:`const value = useMemo(() => ({ theme, toggleTheme }), [theme]);
return <ThemeContext value={value}>{children}</ThemeContext>;`},
{id:'optimistic-list',title:'Optimistic List',category:'Dados',level:'Sênior',description:'Feedback imediato com política de rollback.',kind:'filter',concepts:['useOptimistic','mutation','rollback'],code:`const [optimistic, addOptimistic] = useOptimistic(items,
  (current, item) => [...current, { ...item, pending: true }]
);`},
{id:'transition-search',title:'Transition Search',category:'Performance',level:'Sênior',description:'Atualização não urgente preservando responsividade.',kind:'filter',concepts:['useTransition','priority','Profiler'],code:`const [pending, startTransition] = useTransition();
startTransition(() => setQuery(nextQuery));`},
{id:'error-boundary',title:'Error Boundary',category:'Qualidade',level:'Sênior',description:'Isolamento de falhas com recuperação localizada.',kind:'accordion',concepts:['error boundary','fallback','reset'],code:`<ErrorBoundary fallback={<Recovery />}>
  <CourseWorkspace />
</ErrorBoundary>`},
{id:'external-store',title:'External Store',category:'Arquitetura',level:'Sênior',description:'Integração consistente com estado fora do React.',kind:'reducer',concepts:['useSyncExternalStore','snapshot','subscription'],code:`const state = useSyncExternalStore(
  store.subscribe,
  store.getSnapshot,
  store.getServerSnapshot
);`},
];
