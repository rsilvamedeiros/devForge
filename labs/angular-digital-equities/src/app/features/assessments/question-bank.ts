export interface Question {
  id: string;
  statement: string;
  code?: string;
  options: string[];
  answer: number;
  explanation: string;
}

export interface Exam {
  id: string;
  title: string;
  description: string;
  icon: string;
  chapter: string;
  questions: Question[];
}

export const EXAMS: Exam[] = [
  {
    id: 'fundamentals',
    title: 'Fundamentos e plataforma',
    description: 'Bootstrap, standalone, DI raiz e carregamento sob demanda.',
    icon: 'foundation',
    chapter: 'docs/01-FUNDAMENTALS.md',
    questions: [
      {
        id: 'fund-1',
        statement: 'Em um componente standalone, para que serve o array `imports` do `@Component`?',
        options: [
          'Registra providers de serviços para o componente',
          'Declara os componentes, diretivas e pipes usados no template',
          'Importa folhas de estilo adicionais',
          'Define quais módulos serão carregados sob demanda',
        ],
        answer: 1,
        explanation: 'Em standalone, `imports` declara o que o template pode usar: outros componentes, diretivas e pipes. Providers vão em `providers`, e lazy loading é responsabilidade das rotas.',
      },
      {
        id: 'fund-2',
        statement: 'Qual a diferença prática entre `loadComponent` e `component` em uma rota?',
        code: `{ path: 'market', loadComponent: () => import('./market').then(m => m.Market) }`,
        options: [
          'Nenhuma: `loadComponent` é apenas sintaxe mais nova',
          '`loadComponent` cria o componente sem change detection',
          '`loadComponent` só baixa o código quando a rota é ativada, gerando um chunk separado',
          '`loadComponent` exige que o componente seja NgModule-based',
        ],
        answer: 2,
        explanation: 'O import dinâmico faz o bundler emitir um chunk separado, baixado apenas quando a rota é acessada. Isso reduz o bundle inicial.',
      },
      {
        id: 'fund-3',
        statement: 'O que `providedIn: "root"` garante em um `@Injectable`?',
        options: [
          'Que o serviço é recriado a cada injeção',
          'Que o serviço é singleton na aplicação e tree-shakable se nunca for injetado',
          'Que o serviço só funciona em componentes da rota raiz',
          'Que o serviço é registrado em todos os injectors de componente',
        ],
        answer: 1,
        explanation: 'É uma instância única no injector raiz. Como o registro fica no próprio serviço, o bundler consegue removê-lo se ninguém o injetar.',
      },
      {
        id: 'fund-4',
        statement: 'Por que `bootstrapApplication` recebe `providers` em vez de um NgModule raiz?',
        options: [
          'Porque NgModule foi removido do Angular',
          'Porque a configuração passa a ser uma lista de provedores composta por funções `provideX()`, sem precisar de um módulo container',
          'Porque providers de módulo não funcionam com OnPush',
          'Porque é obrigatório usar zoneless',
        ],
        answer: 1,
        explanation: 'A API standalone substitui o módulo container por uma composição explícita de `provideRouter`, `provideHttpClient`, etc. NgModule continua existindo, mas não é mais necessário.',
      },
      {
        id: 'fund-5',
        statement: 'Qual o efeito de `provideZoneChangeDetection({ eventCoalescing: true })`?',
        options: [
          'Desliga o Zone.js completamente',
          'Agrupa múltiplos eventos disparados no mesmo tick em um único ciclo de verificação',
          'Faz todos os componentes virarem OnPush',
          'Adia a detecção de mudanças até a próxima navegação',
        ],
        answer: 1,
        explanation: 'O coalescing junta eventos próximos em um único ciclo de change detection, reduzindo verificações redundantes sem mudar a semântica da aplicação.',
      },
    ],
  },
  {
    id: 'components',
    title: 'Componentes e templates',
    description: 'Control flow, bindings, lifecycle e change detection.',
    icon: 'view_quilt',
    chapter: 'docs/02-COMPONENTS-TEMPLATES.md',
    questions: [
      {
        id: 'comp-1',
        statement: 'Por que `@for` exige a expressão `track`?',
        code: `@for (asset of assets(); track asset.id) { <tr>...</tr> }`,
        options: [
          'Para ordenar a lista automaticamente',
          'Para o Angular identificar cada item e reaproveitar o DOM em vez de recriar tudo',
          'Para habilitar o OnPush no bloco',
          'Para evitar que a lista seja renderizada duas vezes',
        ],
        answer: 1,
        explanation: 'O `track` dá identidade a cada item. Sem ele o Angular não sabe o que mudou e precisa destruir e recriar nós, perdendo estado do DOM e performance.',
      },
      {
        id: 'comp-2',
        statement: 'Com `ChangeDetectionStrategy.OnPush`, em qual situação o componente NÃO é verificado?',
        options: [
          'Quando um signal lido no template muda',
          'Quando um evento dispara a partir do próprio template',
          'Quando uma propriedade de um objeto recebido via input é mutada sem trocar a referência',
          'Quando uma referência de input muda',
        ],
        answer: 2,
        explanation: 'OnPush compara referências de input. Mutar um campo interno mantém a mesma referência, então o componente não é marcado para verificação. Signals e eventos do template funcionam normalmente.',
      },
      {
        id: 'comp-3',
        statement: 'O que diferencia `[value]="x"` de `value="x"` em um template?',
        options: [
          'Nada, são equivalentes',
          '`[value]` avalia uma expressão do componente; `value` passa a string literal',
          '`value` é mais performático',
          '`[value]` só funciona em componentes Angular, não em elementos nativos',
        ],
        answer: 1,
        explanation: 'Colchetes indicam property binding: o conteúdo é uma expressão avaliada. Sem colchetes, o valor é tratado como string literal.',
      },
      {
        id: 'comp-4',
        statement: 'Onde é seguro disparar a carga inicial de dados de um componente de rota?',
        options: [
          'No construtor, sempre',
          'Em `ngOnInit`, quando a carga depende de inputs/rota já resolvidos',
          'No `ngOnDestroy`',
          'Em `ngAfterViewChecked`, para garantir que a view existe',
        ],
        answer: 1,
        explanation: '`ngOnInit` roda depois de inputs e parâmetros estarem disponíveis. O construtor deve ficar restrito a injeção e inicialização barata; `ngAfterViewChecked` roda a cada verificação e causaria loops.',
      },
      {
        id: 'comp-5',
        statement: 'O que o seletor `:host` faz no SCSS de um componente?',
        options: [
          'Estiliza o elemento que hospeda o componente',
          'Estiliza todos os filhos do componente',
          'Remove o encapsulamento de estilo',
          'Aplica estilos globais na aplicação',
        ],
        answer: 0,
        explanation: '`:host` alcança o próprio elemento do componente (ex.: `<app-sidebar>`), que por padrão é inline e normalmente precisa de `display` explícito.',
      },
    ],
  },
  {
    id: 'di-data',
    title: 'DI, dados e navegação',
    description: 'Injeção, tokens, HTTP, rotas e formulários.',
    icon: 'account_tree',
    chapter: 'docs/03-DI-DATA-NAVIGATION.md',
    questions: [
      {
        id: 'di-1',
        statement: 'Qual limitação `inject()` tem em relação à injeção por construtor?',
        options: [
          'Só funciona em serviços',
          'Só pode ser chamado dentro de um contexto de injeção (inicialização de campo, construtor, factory)',
          'Não funciona com tokens customizados',
          'Não suporta serviços `providedIn: "root"`',
        ],
        answer: 1,
        explanation: 'Fora do contexto de injeção (ex.: dentro de um callback assíncrono ou de um `new` manual) `inject()` lança erro. Use em inicializadores de campo, construtor ou `runInInjectionContext`.',
      },
      {
        id: 'di-2',
        statement: 'O que este token garante?',
        code: `export const PRICE_FEED = new InjectionToken<PriceFeed>('PRICE_FEED', {
  providedIn: 'root',
  factory: () => inject(SimulatedPriceFeed),
});`,
        options: [
          'Que só a implementação simulada pode ser usada',
          'Um default disponível em toda a app, substituível por outra implementação via providers',
          'Que o feed será instanciado uma vez por componente',
          'Que a implementação é escolhida em tempo de build',
        ],
        answer: 1,
        explanation: 'A factory define o padrão e mantém o token tree-shakable. Trocar a implementação é adicionar `{ provide: PRICE_FEED, useClass: WebSocketPriceFeed }` — nenhum consumidor muda.',
      },
      {
        id: 'di-3',
        statement: 'Quando usar `paramMap` como Observable em vez de `snapshot.paramMap`?',
        options: [
          'Sempre, snapshot está obsoleto',
          'Quando a navegação pode trocar o parâmetro reaproveitando a mesma instância do componente',
          'Apenas quando a rota é lazy',
          'Quando a rota tem guards',
        ],
        answer: 1,
        explanation: 'Ao navegar de `/market/PETR4` para `/market/VALE3`, o Angular reaproveita o componente e o snapshot não atualiza. O Observable emite o novo valor.',
      },
      {
        id: 'di-4',
        statement: 'Em Reactive Forms, o que `nonNullable` muda em um controle?',
        options: [
          'Impede o valor de ser vazio',
          'Faz o `reset()` voltar para o valor inicial em vez de `null`, e remove `null` do tipo',
          'Torna o campo obrigatório',
          'Desabilita a validação assíncrona',
        ],
        answer: 1,
        explanation: 'É sobre tipagem e reset: o tipo deixa de incluir `null` e `reset()` restaura o valor inicial. Obrigatoriedade continua sendo papel do `Validators.required`.',
      },
      {
        id: 'di-5',
        statement: 'Por que um interceptor funcional é registrado em `provideHttpClient(withInterceptors([...]))`?',
        options: [
          'Porque interceptors de classe foram removidos',
          'Porque a API standalone compõe a configuração por funções, sem precisar de módulo e multi-provider manual',
          'Porque interceptors funcionais são mais rápidos',
          'Porque só assim eles rodam antes das rotas',
        ],
        answer: 1,
        explanation: 'É a mesma lógica de `bootstrapApplication`: configuração explícita por composição de funções, em vez de registrar `HTTP_INTERCEPTORS` com `multi: true` em um módulo.',
      },
    ],
  },
  {
    id: 'signals-rxjs',
    title: 'Signals, RxJS e estado',
    description: 'Reatividade síncrona, streams e ownership de estado.',
    icon: 'electric_bolt',
    chapter: 'docs/04-SIGNALS-RXJS-STATE.md',
    questions: [
      {
        id: 'sig-1',
        statement: 'Qual característica descreve `computed()`?',
        options: [
          'Recalcula a cada leitura',
          'Recalcula em um intervalo fixo',
          'É lazy e memoizado: só recalcula quando uma dependência muda e alguém o lê',
          'Precisa ser atualizado manualmente com `set()`',
        ],
        answer: 2,
        explanation: 'O valor é cacheado e invalidado quando uma dependência muda. Se ninguém ler, o recálculo nem acontece.',
      },
      {
        id: 'sig-2',
        statement: 'Qual a forma correta de atualizar uma lista em um signal mantendo imutabilidade?',
        code: `readonly assets = signal<Asset[]>([]);`,
        options: [
          'assets().push(novo)',
          'assets.update(list => [...list, novo])',
          'assets.set(assets().push(novo))',
          'assets().length = 0',
        ],
        answer: 1,
        explanation: '`update` recebe o valor atual e retorna um novo. `push` mutaria o array sem notificar os consumidores, e `push` retorna o novo length — não o array.',
      },
      {
        id: 'sig-3',
        statement: 'Qual operador usar para cancelar a requisição anterior quando uma nova chega (ex.: busca conforme digita)?',
        options: ['mergeMap', 'concatMap', 'switchMap', 'exhaustMap'],
        answer: 2,
        explanation: '`switchMap` cancela o inner observable anterior. `concatMap` enfileira, `mergeMap` paraleliza e `exhaustMap` ignora novas emissões enquanto a atual não termina (bom para evitar duplo submit).',
      },
      {
        id: 'sig-4',
        statement: 'Por que `toSignal` normalmente recebe `initialValue`?',
        options: [
          'Para evitar memory leak',
          'Porque um Observable pode não ter emitido ainda, e o signal precisa de um valor síncrono',
          'Para forçar o unsubscribe',
          'Porque é obrigatório em todos os casos',
        ],
        answer: 1,
        explanation: 'Signals são sempre síncronos. Sem valor inicial (e sem emissão síncrona), o tipo inclui `undefined`.',
      },
      {
        id: 'sig-5',
        statement: 'Qual uso de `effect()` é apropriado?',
        options: [
          'Derivar um valor a partir de outros signals',
          'Sincronizar com algo fora do Angular, como localStorage ou uma API do browser',
          'Substituir `computed` por ser mais simples',
          'Atualizar signals em cascata para manter estado duplicado',
        ],
        answer: 1,
        explanation: 'Derivação é papel do `computed`. `effect` existe para efeitos colaterais — persistir, logar, tocar no DOM/browser. Escrever signals dentro de effects tende a criar estado duplicado.',
      },
    ],
  },
  {
    id: 'quality',
    title: 'Qualidade e arquitetura',
    description: 'Testes, performance, fronteiras e trade-offs.',
    icon: 'verified',
    chapter: 'docs/05-QUALITY-ARCHITECTURE.md',
    questions: [
      {
        id: 'qua-1',
        statement: 'Para que serve `fakeAsync` + `tick()` em um teste?',
        options: [
          'Acelerar a suíte inteira',
          'Controlar o tempo de forma determinística, executando timers sem espera real',
          'Rodar o teste fora da zona do Angular',
          'Substituir o `TestBed`',
        ],
        answer: 1,
        explanation: 'O tempo vira controlável: `tick(600)` avança timers agendados sem esperar de verdade, eliminando flakiness de testes baseados em `setTimeout`.',
      },
      {
        id: 'qua-2',
        statement: 'Um componente usa `routerLink` no template. O que o teste precisa?',
        options: [
          'Nada, o Router é global',
          'Fornecer o Router no TestBed (ex.: `provideRouter([])`), senão a diretiva falha ao injetar `ActivatedRoute`',
          'Trocar `routerLink` por `href`',
          'Marcar o componente como `standalone: false`',
        ],
        answer: 1,
        explanation: 'A diretiva injeta dependências do Router. Sem provider, o TestBed lança NG0201 — exatamente o erro que aparece ao adicionar um link sem ajustar o spec.',
      },
      {
        id: 'qua-3',
        statement: 'Por que trocar a implementação de um feed via token de DI ajuda os testes?',
        options: [
          'Porque remove a necessidade de asserções',
          'Porque permite injetar uma implementação determinística sem alterar o código consumidor',
          'Porque torna o serviço singleton',
          'Porque evita usar TestBed',
        ],
        answer: 1,
        explanation: 'Se o consumidor depende do token (contrato) e não da classe concreta, o teste fornece um dublê previsível. É o mesmo mecanismo que permite trocar o feed simulado por WebSocket em produção.',
      },
      {
        id: 'qua-4',
        statement: 'Qual combinação é coerente para performance de renderização?',
        options: [
          'OnPush + estado em signals lidos no template',
          'Default + mutação de objetos compartilhados',
          'OnPush + mutação de arrays sem trocar referência',
          'Default + `detectChanges()` manual em cada evento',
        ],
        answer: 0,
        explanation: 'Signals notificam o sistema de change detection diretamente, então combinam naturalmente com OnPush. Mutação sem troca de referência quebra OnPush.',
      },
      {
        id: 'qua-5',
        statement: 'O que caracteriza uma boa fronteira entre feature e core neste lab?',
        options: [
          'Componentes de feature acessando diretamente o WebSocket',
          'Regra de negócio dentro do template',
          'Core expondo contratos (models, services, tokens) e features consumindo sem conhecer a implementação',
          'Cada feature com sua própria cópia do modelo de domínio',
        ],
        answer: 2,
        explanation: 'A feature depende do contrato, não da implementação. Isso mantém a regra testável fora do componente e permite trocar infraestrutura sem tocar na UI.',
      },
    ],
  },
];
