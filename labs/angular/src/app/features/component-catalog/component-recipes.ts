export interface ComponentRecipe {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: string;
  api: { name: string; role: string }[];
  watch: string[];
  code: string;
}

export const COMPONENT_RECIPES: ComponentRecipe[] = [
  {
    id:'content-projection',title:'Projeção com ng-content',category:'Componentes',description:'O componente define a estrutura e o consumidor fornece conteúdo por slots.',icon:'dashboard_customize',
    api:[{name:'<ng-content>',role:'Slot padrão para conteúdo projetado.'},{name:'select="[card-title]"',role:'Direciona conteúdo para um slot nomeado.'}],
    watch:['O card não precisa conhecer o tipo concreto do conteúdo.','Projeção resolve composição; inputs continuam melhores para dados.'],
    code:`@Component({\n  selector: 'app-study-card',\n  template: \`<header><ng-content select="[card-title]" /></header>\n             <main><ng-content /></main>\n             <footer><ng-content select="[card-actions]" /></footer>\`\n})\nexport class StudyCard {}`,
  },
  {
    id:'attribute-directive',title:'Diretiva de atributo',category:'Diretivas',description:'Adiciona comportamento a um elemento existente sem introduzir outra view.',icon:'auto_fix_high',
    api:[{name:'@Directive',role:'Declara comportamento reutilizável.'},{name:'host',role:'Vincula propriedades e eventos do elemento hospedeiro.'}],
    watch:['A diretiva cuida do comportamento, não do conteúdo.','Prefira host metadata para bindings estáticos e reativos simples.'],
    code:`@Directive({\n  selector: '[appLearningHighlight]',\n  host: { '[class.active]': 'active' }\n})\nexport class LearningHighlightDirective {\n  active = false;\n  @HostListener('mouseenter') enter() { this.active = true; }\n}`,
  },
  {
    id:'view-query',title:'Query reativa com viewChild',category:'Componentes',description:'Consulta um elemento da view como Signal e usa a referência somente quando necessário.',icon:'center_focus_strong',
    api:[{name:'viewChild<T>()',role:'Query reativa para elemento, diretiva ou componente filho.'},{name:'ElementRef',role:'Ponte para API nativa; deve permanecer localizada.'}],
    watch:['A query pode estar ausente antes de o elemento existir.','Acesso ao DOM é pontual; estado visual continua declarativo.'],
    code:`readonly box = viewChild<ElementRef<HTMLElement>>('box');\n\nfocusBox(): void {\n  this.box()?.nativeElement.focus();\n}`,
  },
  {
    id:'async-pipe',title:'Observable com AsyncPipe',category:'Reatividade',description:'O template consome um stream e o Angular gerencia assinatura e cleanup.',icon:'stream',
    api:[{name:'AsyncPipe',role:'Assina Observable ou Promise e entrega o último valor.'},{name:'startWith()',role:'Fornece estado inicial antes da primeira emissão.'}],
    watch:['Não existe subscribe manual no componente.','Streams frios repetidos no template podem exigir compartilhamento.'],
    code:`readonly review$ = interval(1000).pipe(\n  map(value => 'há ' + (value + 1) + 's'),\n  startWith('agora')\n);\n\n// template\n{{ review$ | async }}`,
  },
  {
    id:'defer-block',title:'Carregamento com @defer',category:'Performance',description:'Adia conteúdo e dependências até um gatilho relevante.',icon:'hourglass_top',
    api:[{name:'@defer (when ...)',role:'Define gatilho de carregamento do bloco.'},{name:'@placeholder',role:'Conteúdo leve antes do carregamento.'}],
    watch:['O placeholder pertence ao bundle inicial; o bloco pode virar chunk lazy.','Escolha gatilho pela jornada, não apenas para reduzir números.'],
    code:`@defer (when loaded()) {\n  <app-heavy-content />\n} @placeholder {\n  <p>Aguardando intenção do usuário.</p>\n}`,
  },
  {
    id: 'input-output', title: 'Inputs e outputs com signals', category: 'Componentes', description: 'Fluxo unidirecional: o pai possui o estado e o filho comunica intenções.', icon: 'swap_horiz',
    api: [{name:'input.required<T>()',role:'Entrada obrigatória, tipada e reativa.'},{name:'output<T>()',role:'Evento tipado emitido para o consumidor.'}],
    watch: ['O componente filho não altera diretamente o estado do pai.','O evento descreve a mudança solicitada e mantém ownership claro.'],
    code: `readonly label = input.required<string>();\nreadonly value = input(0);\nreadonly changed = output<number>();\n\n// template do filho\n<button (click)="changed.emit(value() + 1)">Incrementar</button>`,
  },
  {
    id: 'model-binding', title: 'Two-way binding com model()', category: 'Componentes', description: 'Um controle editável expõe valor com binding bidirecional tipado.', icon: 'sync',
    api: [{name:'model<T>()',role:'Combina input gravável e output de mudança.'},{name:'[(value)]',role:'Sintaxe banana-in-a-box do consumidor.'}],
    watch: ['O valor continua visível como signal no pai e no filho.','Use para controles; prefira output para eventos de domínio.'],
    code: `// filho\nreadonly value = model('');\n\n// pai\nreadonly title = signal('Signals no Angular');\n\n<app-title-editor [(value)]="title" />`,
  },
  {
    id: 'control-flow', title: 'Control flow nativo', category: 'Templates', description: 'Estados mutuamente exclusivos com @switch e listas com @for.', icon: 'alt_route',
    api: [{name:'@switch / @case',role:'Seleciona um bloco a partir de um estado.'},{name:'@for (...; track ...)',role:'Renderiza coleção com identidade.'}],
    watch: ['Uma união de estados evita combinações impossíveis.','O template apenas apresenta um estado já nomeado.'],
    code: `@switch (state()) {\n  @case ('loading') { <mat-spinner /> }\n  @case ('error') { <app-error /> }\n  @default { <app-content /> }\n}`,
  },
  {
    id: 'custom-pipe', title: 'Pipe puro customizado', category: 'Templates', description: 'Transforma um valor para apresentação sem mudar a fonte.', icon: 'transform',
    api: [{name:'PipeTransform',role:'Contrato da transformação.'},{name:'pure: true',role:'Reexecuta quando a referência dos argumentos muda.'}],
    watch: ['A fonte permanece numérica; somente a view recebe o texto.','Pipes não são lugar para I/O ou efeitos colaterais.'],
    code: `@Pipe({ name: 'studyTime', pure: true })\nexport class StudyTimePipe implements PipeTransform {\n  transform(minutes: number): string {\n    const hours = Math.floor(minutes / 60);\n    return hours ? hours + 'h ' + (minutes % 60) + 'min' : minutes + 'min';\n  }\n}`,
  },
  {
    id: 'signal-derived',
    title: 'Estado derivado com signal + computed',
    category: 'Reatividade',
    description: 'Aulas é o estado; carga total é derivada. Nunca guarde o que dá para calcular.',
    icon: 'electric_bolt',
    api: [
      { name: 'signal(valor)', role: 'Estado gravável, leitura síncrona por chamada de função.' },
      { name: 'computed(fn)', role: 'Valor derivado, memoizado e recalculado sob demanda.' },
      { name: '.update(fn)', role: 'Atualiza a partir do valor atual, mantendo imutabilidade.' },
    ],
    watch: [
      'O total nunca é atribuído — some o `computed` e o bug de estado duplicado aparece.',
      'O componente é OnPush e mesmo assim atualiza: signals notificam o change detection.',
    ],
    code: `readonly lessonMinutes = 25;
readonly quantity = signal(4);
readonly totalMinutes = computed(() => this.quantity() * this.lessonMinutes);

add(): void { this.quantity.update(value => value + 1); }
remove(): void { this.quantity.update(value => Math.max(0, value - 1)); }`,
  },
  {
    id: 'for-track',
    title: 'Listas com @for e track',
    category: 'Templates',
    description: 'A identidade do item decide se o Angular reaproveita ou recria o DOM.',
    icon: 'format_list_bulleted',
    api: [
      { name: '@for (item of lista(); track item.id)', role: 'Itera com identidade estável por item.' },
      { name: 'track $index', role: 'Alternativa frágil: a posição vira a identidade.' },
    ],
    watch: [
      'Digite nos inputs e clique em "Embaralhar": o texto segue a linha certa.',
      'Trocando para `track $index`, o conteúdo digitado ficaria preso à posição, não ao tópico.',
    ],
    code: `@for (topic of topics(); track topic.id) {
  <li>
    <span>{{ topic.title }}</span>
    <input type="text" placeholder="anote algo aqui" />
  </li>
}

// no componente
prepend(): void {
  this.topics.update(list => [{ id: this.nextId++, title }, ...list]);
}`,
  },
  {
    id: 'reactive-form',
    title: 'Reactive Forms tipado',
    category: 'Formulários',
    description: 'Validação declarativa, mensagens por erro e tipo sem null.',
    icon: 'edit_note',
    api: [
      { name: 'fb.nonNullable.group()', role: 'Remove null do tipo e faz reset voltar ao valor inicial.' },
      { name: 'Validators.email / minLength()', role: 'Regras declarativas e combináveis.' },
      { name: 'markAllAsTouched()', role: 'Revela os erros ao tentar enviar inválido.' },
    ],
    watch: [
      'Envie vazio: as mensagens aparecem porque o submit marca os campos como touched.',
      'Cada `mat-error` é condicionado ao erro específico, não a um "inválido" genérico.',
    ],
    code: `readonly form = this.fb.nonNullable.group({
  name: ['', [Validators.required, Validators.minLength(3)]],
  email: ['', [Validators.required, Validators.email]],
});

submit(): void {
  if (this.form.invalid) {
    this.form.markAllAsTouched();
    return;
  }
  const value = this.form.getRawValue();
}`,
  },
  {
    id: 'view-states',
    title: 'Loading, erro, vazio e pronto',
    category: 'Templates',
    description: 'Os quatro estados de qualquer tela que busca dados, mutuamente exclusivos.',
    icon: 'dashboard_customize',
    api: [
      { name: '@if / @else if / @else', role: 'Control flow nativo, sem diretiva estrutural importada.' },
      { name: 'signal<ViewState>', role: 'Estado único da tela em vez de três booleanos soltos.' },
    ],
    watch: [
      'Um único signal descreve a tela — três booleanos permitiriam estados impossíveis.',
      'O estado vazio é diferente do loading: some com ele e a tela fica ambígua.',
    ],
    code: `type ViewState = 'loading' | 'error' | 'empty' | 'ready';
readonly state = signal<ViewState>('loading');

// template
@if (state() === 'loading') {
  <mat-spinner diameter="28" />
} @else if (state() === 'error') {
  <button (click)="state.set('ready')">Tentar novamente</button>
} @else if (state() === 'empty') {
  <span>Nenhuma aula encontrada.</span>
} @else {
  <!-- lista -->
}`,
  },
  {
    id: 'rxjs-to-signal',
    title: 'Stream RxJS virando signal',
    category: 'Reatividade',
    description: 'Fonte assíncrona contínua consumida como valor síncrono no template.',
    icon: 'sensors',
    api: [
      { name: 'toSignal(obs$, { initialValue })', role: 'Converte Observable em signal e cuida do unsubscribe.' },
      { name: 'interval(ms)', role: 'Fonte periódica usada aqui para contar o tempo da sessão.' },
    ],
    watch: [
      'O contador muda sozinho a cada segundo sem nenhum subscribe manual no componente.',
      'Sem `initialValue`, o tipo do signal incluiria `undefined` até a primeira emissão.',
    ],
    code: `readonly elapsed = toSignal(
  interval(1000).pipe(map(value => value + 1)),
  { initialValue: 0 }
);`,
  },
];
