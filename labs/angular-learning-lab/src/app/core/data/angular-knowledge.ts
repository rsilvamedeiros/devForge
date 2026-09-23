export type KnowledgeLevel = 'Fundamento' | 'Intermediário' | 'Avançado';

export interface AngularArea {
  id: string;
  title: string;
  description: string;
  icon: string;
  level: KnowledgeLevel;
  topics: string[];
  outcome: string;
  documentationPath: string;
}

export interface AngularApi {
  name: string;
  kind: 'Core' | 'Template' | 'Forms' | 'Router' | 'HTTP' | 'RxJS' | 'Testing' | 'Platform';
  summary: string;
  useWhen: string;
  avoid: string;
  example: string;
}

export const ANGULAR_AREAS: AngularArea[] = [
  { id: 'platform', title: 'Plataforma e tooling', description: 'CLI, workspace, bootstrap, configuração e ciclo de build.', icon: 'construction', level: 'Fundamento', topics: ['Angular CLI', 'angular.json', 'bootstrapApplication', 'environments', 'budgets'], outcome: 'Criar, executar e diagnosticar uma aplicação Angular moderna.', documentationPath: 'docs/01-FUNDAMENTALS.md' },
  { id: 'typescript', title: 'TypeScript no Angular', description: 'Tipos estritos, inferência, generics e contratos da aplicação.', icon: 'data_object', level: 'Fundamento', topics: ['strict', 'interfaces', 'unions', 'generics', 'utility types'], outcome: 'Modelar contratos sem recorrer a any e usar o compilador como ferramenta de design.', documentationPath: 'docs/01-FUNDAMENTALS.md' },
  { id: 'components', title: 'Componentes', description: 'Standalone components, ciclo de vida, inputs, outputs e composição.', icon: 'widgets', level: 'Fundamento', topics: ['standalone', 'input', 'output', 'model', 'host bindings'], outcome: 'Desenhar componentes pequenos, previsíveis e acessíveis.', documentationPath: 'docs/02-COMPONENTS-TEMPLATES.md' },
  { id: 'templates', title: 'Templates', description: 'Bindings, expressions, pipes, control flow e identidade de listas.', icon: 'view_quilt', level: 'Fundamento', topics: ['@if', '@for', '@switch', '@let', 'pipes'], outcome: 'Construir views declarativas sem esconder regra de negócio no HTML.', documentationPath: 'docs/02-COMPONENTS-TEMPLATES.md' },
  { id: 'di', title: 'Injeção de dependência', description: 'Providers, tokens, hierarquia de injectors e escopo.', icon: 'account_tree', level: 'Intermediário', topics: ['inject', 'providers', 'InjectionToken', 'factory', 'hierarquia'], outcome: 'Controlar dependências e escopos sem service locator ou singletons acidentais.', documentationPath: 'docs/03-DI-DATA-NAVIGATION.md' },
  { id: 'signals', title: 'Signals e estado', description: 'Estado gravável, derivação, efeitos e interoperabilidade.', icon: 'electric_bolt', level: 'Intermediário', topics: ['signal', 'computed', 'effect', 'linkedSignal', 'resource'], outcome: 'Manter uma fonte de verdade e derivar o restante de forma reativa.', documentationPath: 'docs/04-SIGNALS-RXJS-STATE.md' },
  { id: 'rxjs', title: 'RxJS', description: 'Streams, operadores, cancelamento, erros e fronteiras com Signals.', icon: 'waves', level: 'Intermediário', topics: ['Observable', 'switchMap', 'combineLatest', 'catchError', 'toSignal'], outcome: 'Modelar eventos assíncronos e escolher operadores pela semântica.', documentationPath: 'docs/04-SIGNALS-RXJS-STATE.md' },
  { id: 'forms', title: 'Formulários', description: 'Reactive Forms tipados, validação, estado e UX.', icon: 'edit_note', level: 'Intermediário', topics: ['FormControl', 'FormGroup', 'FormArray', 'validators', 'ControlValueAccessor'], outcome: 'Criar formulários tipados, acessíveis e testáveis.', documentationPath: 'docs/06-FORMS.md' },
  { id: 'router', title: 'Router', description: 'Rotas, parâmetros, guards, resolvers e lazy loading.', icon: 'route', level: 'Intermediário', topics: ['Routes', 'routerLink', 'guards', 'resolvers', 'loadComponent'], outcome: 'Organizar navegação, permissões e carregamento por feature.', documentationPath: 'docs/07-ROUTER-HTTP.md' },
  { id: 'http', title: 'Dados e HTTP', description: 'HttpClient, interceptors, contratos, cache e estados de requisição.', icon: 'cloud_sync', level: 'Intermediário', topics: ['HttpClient', 'interceptors', 'DTO mapping', 'errors', 'cache'], outcome: 'Isolar infraestrutura e representar loading, erro, vazio e sucesso.', documentationPath: 'docs/07-ROUTER-HTTP.md' },
  { id: 'testing', title: 'Testes', description: 'Unidade, integração, harnesses, HTTP e doubles.', icon: 'science', level: 'Intermediário', topics: ['TestBed', 'ComponentFixture', 'Harness', 'HttpTestingController', 'spies'], outcome: 'Testar comportamento e contratos sem acoplar ao detalhe interno.', documentationPath: 'docs/08-TESTING.md' },
  { id: 'performance', title: 'Performance', description: 'OnPush, rendering, defer, profiling e tamanho de bundle.', icon: 'speed', level: 'Avançado', topics: ['OnPush', '@defer', 'track', 'lazy loading', 'profiling'], outcome: 'Medir antes de otimizar e atacar custo de renderização e entrega.', documentationPath: 'docs/09-PERFORMANCE-SECURITY.md' },
  { id: 'security', title: 'Segurança', description: 'Sanitização, XSS, auth, guards e fronteiras de confiança.', icon: 'security', level: 'Avançado', topics: ['sanitization', 'XSS', 'CSP', 'auth', 'trusted types'], outcome: 'Tratar dados externos como não confiáveis e não confundir guard com autorização.', documentationPath: 'docs/09-PERFORMANCE-SECURITY.md' },
  { id: 'architecture', title: 'Arquitetura', description: 'Feature boundaries, estado, ports/adapters e evolução.', icon: 'architecture', level: 'Avançado', topics: ['feature-first', 'facades', 'ports', 'state ownership', 'boundaries'], outcome: 'Fazer a estrutura refletir capacidades e manter dependências direcionais.', documentationPath: 'docs/05-QUALITY-ARCHITECTURE.md' },
  { id: 'rendering', title: 'SSR e entrega', description: 'SSR, hydration, prerender, SEO e compatibilidade com browser.', icon: 'public', level: 'Avançado', topics: ['SSR', 'hydration', 'prerender', 'TransferState', 'browser APIs'], outcome: 'Escolher a estratégia de renderização conforme produto e operação.', documentationPath: 'docs/10-SSR-TOOLING.md' },
];

export const ANGULAR_APIS: AngularApi[] = [
  { name: 'signal()', kind: 'Core', summary: 'Cria estado reativo gravável e síncrono.', useWhen: 'A UI possui uma fonte de estado local ou compartilhada.', avoid: 'Não duplique valores que podem ser derivados.', example: "readonly count = signal(0);" },
  { name: 'computed()', kind: 'Core', summary: 'Deriva e memoiza um valor a partir de outros signals.', useWhen: 'O valor é uma função pura de outro estado.', avoid: 'Não produza efeitos colaterais dentro do cálculo.', example: "readonly total = computed(() => this.items().length);" },
  { name: 'effect()', kind: 'Core', summary: 'Executa efeito colateral quando dependências reativas mudam.', useWhen: 'Sincronizar com API imperativa, log ou storage.', avoid: 'Não use para propagar estado entre signals.', example: "effect(() => localStorage.setItem('theme', this.theme()));" },
  { name: 'input()', kind: 'Core', summary: 'Declara entrada reativa de componente.', useWhen: 'O pai fornece dados ao filho.', avoid: 'Não mute objetos recebidos.', example: "readonly user = input.required<User>();" },
  { name: 'output()', kind: 'Core', summary: 'Declara evento emitido pelo componente.', useWhen: 'O filho comunica uma intenção ao pai.', avoid: 'Evite eventos que expõem detalhes internos.', example: "readonly saved = output<User>();" },
  { name: 'model()', kind: 'Core', summary: 'Cria binding bidirecional baseado em signal.', useWhen: 'O componente edita um valor controlado pelo pai.', avoid: 'Não use two-way binding para eventos de domínio.', example: "readonly value = model('');" },
  { name: 'inject()', kind: 'Core', summary: 'Resolve uma dependência no contexto de injeção.', useWhen: 'Componente, service, guard ou factory precisa de uma porta.', avoid: 'Não esconda dependências em funções arbitrárias.', example: "private readonly api = inject(CourseApi);" },
  { name: 'ChangeDetectionStrategy.OnPush', kind: 'Core', summary: 'Reduz verificações e explicita gatilhos de renderização.', useWhen: 'Padrão para componentes orientados a inputs e signals.', avoid: 'Não mutar dados e esperar renderização implícita.', example: 'changeDetection: ChangeDetectionStrategy.OnPush' },
  { name: '@if', kind: 'Template', summary: 'Renderiza blocos condicionais com control flow nativo.', useWhen: 'Estados de view são mutuamente exclusivos.', avoid: 'Evite condições longas; derive um estado nomeado.', example: '@if (loading()) { <mat-spinner /> }' },
  { name: '@for', kind: 'Template', summary: 'Renderiza coleções com identidade explícita.', useWhen: 'Listas dinâmicas.', avoid: 'Evite track $index quando itens podem mudar de posição.', example: '@for (item of items(); track item.id) { ... }' },
  { name: '@switch', kind: 'Template', summary: 'Seleciona um bloco entre vários estados.', useWhen: 'Uma união discriminada representa o estado da tela.', avoid: 'Não replique regras de negócio no template.', example: '@switch (state().kind) { @case (\'ready\') { ... } }' },
  { name: '@defer', kind: 'Template', summary: 'Adia carregamento de dependências e UI pesada.', useWhen: 'Conteúdo abaixo da dobra ou acionado por interação.', avoid: 'Não adie conteúdo essencial para a primeira tarefa.', example: '@defer (on viewport) { <heavy-chart /> }' },
  { name: 'AsyncPipe', kind: 'Template', summary: 'Assina Observable/Promise e gerencia o ciclo de vida.', useWhen: 'O template consome diretamente um stream simples.', avoid: 'Evite múltiplos async sobre o mesmo stream frio.', example: '{{ user$ | async | json }}' },
  { name: 'FormControl', kind: 'Forms', summary: 'Representa valor, validação e estado de um campo.', useWhen: 'Reactive Forms precisam de controle explícito.', avoid: 'Prefira nonNullable quando null não faz parte do domínio.', example: "new FormControl('', { nonNullable: true })" },
  { name: 'FormGroup', kind: 'Forms', summary: 'Agrupa controles tipados em uma estrutura.', useWhen: 'Formulários possuem campos relacionados.', avoid: 'Não use o form como modelo de domínio permanente.', example: 'this.fb.nonNullable.group({ name: [\'\'] })' },
  { name: 'FormArray', kind: 'Forms', summary: 'Representa coleção dinâmica de controles.', useWhen: 'O usuário adiciona ou remove itens.', avoid: 'Não indexe erros somente pela posição na UI.', example: 'this.fb.array<FormControl<string>>([])' },
  { name: 'ControlValueAccessor', kind: 'Forms', summary: 'Integra componente customizado à API de formulários.', useWhen: 'Um controle reutilizável deve funcionar com formControl.', avoid: 'Não implemente para um campo usado uma única vez.', example: 'writeValue(value: Rating): void { ... }' },
  { name: 'RouterLink', kind: 'Router', summary: 'Navega declarativamente preservando semântica de link.', useWhen: 'Navegação iniciada por link ou menu.', avoid: 'Não troque por click + navigate sem necessidade.', example: '<a [routerLink]="[\'/course\', id]">Abrir</a>' },
  { name: 'loadComponent', kind: 'Router', summary: 'Carrega uma rota standalone sob demanda.', useWhen: 'Separar bundles por feature.', avoid: 'Evite microchunks sem ganho mensurável.', example: "loadComponent: () => import('./page').then(m => m.Page)" },
  { name: 'CanActivateFn', kind: 'Router', summary: 'Decide acesso de navegação no cliente.', useWhen: 'UX depende de autenticação ou pré-condição.', avoid: 'Guard não substitui autorização no servidor.', example: 'export const authGuard: CanActivateFn = () => inject(Auth).ready();' },
  { name: 'ResolveFn', kind: 'Router', summary: 'Prepara dado antes de ativar a rota.', useWhen: 'A tela não faz sentido sem o dado inicial.', avoid: 'Evite bloquear navegação por dados secundários.', example: 'export const courseResolver: ResolveFn<Course> = route => ...' },
  { name: 'HttpClient', kind: 'HTTP', summary: 'Cliente tipado para comunicação HTTP.', useWhen: 'Adaptadores de infraestrutura acessam APIs.', avoid: 'Não espalhe chamadas HTTP por componentes.', example: 'this.http.get<CourseDto[]>(\'/api/courses\')' },
  { name: 'HttpInterceptorFn', kind: 'HTTP', summary: 'Intercepta requests e responses funcionalmente.', useWhen: 'Headers, tracing ou tratamento transversal.', avoid: 'Não concentre toda regra de erro em um interceptor.', example: 'export const authInterceptor: HttpInterceptorFn = (req, next) => ...' },
  { name: 'toSignal()', kind: 'RxJS', summary: 'Expõe Observable como Signal e gerencia assinatura.', useWhen: 'A view precisa ler o último valor sincronicamente.', avoid: 'Não converta cedo se a composição ainda é de streams.', example: 'readonly course = toSignal(this.course$);' },
  { name: 'toObservable()', kind: 'RxJS', summary: 'Expõe Signal como Observable.', useWhen: 'Estado síncrono alimenta pipeline assíncrono.', avoid: 'Não use para simples derivação síncrona.', example: 'toObservable(this.query).pipe(switchMap(...))' },
  { name: 'TestBed', kind: 'Testing', summary: 'Configura contexto de injeção e componentes em testes.', useWhen: 'O teste depende do runtime Angular.', avoid: 'Funções e classes puras não precisam dele.', example: 'TestBed.configureTestingModule({ imports: [Page] })' },
  { name: 'ComponentFixture', kind: 'Testing', summary: 'Controla instância, DOM e change detection.', useWhen: 'Validar comportamento observável do componente.', avoid: 'Não teste membros privados.', example: 'fixture.detectChanges(); expect(fixture.nativeElement...)' },
  { name: 'HttpTestingController', kind: 'Testing', summary: 'Captura e responde requests HTTP em testes.', useWhen: 'Testar adaptadores HttpClient sem rede.', avoid: 'Sempre execute verify() para detectar requests pendentes.', example: "http.expectOne('/api/courses').flush([]);" },
  { name: 'bootstrapApplication()', kind: 'Platform', summary: 'Inicializa aplicação standalone.', useWhen: 'Entrada principal de apps modernos.', avoid: 'Não misture providers duplicados em vários pontos.', example: 'bootstrapApplication(App, appConfig)' },
  { name: 'provideRouter()', kind: 'Platform', summary: 'Registra Router e sua configuração.', useWhen: 'Bootstrap standalone.', avoid: 'Mantenha rotas por feature quando o arquivo crescer.', example: 'provideRouter(routes, withComponentInputBinding())' },
  { name: 'provideHttpClient()', kind: 'Platform', summary: 'Registra HttpClient e features funcionais.', useWhen: 'Bootstrap standalone com acesso HTTP.', avoid: 'Configure interceptors em um único composition root.', example: 'provideHttpClient(withInterceptors([authInterceptor]))' },
];
