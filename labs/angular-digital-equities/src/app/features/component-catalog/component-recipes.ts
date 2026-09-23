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
    id: 'signal-derived',
    title: 'Estado derivado com signal + computed',
    category: 'Reatividade',
    description: 'Quantidade é o estado; total é derivado. Nunca guarde o que dá para calcular.',
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
    code: `readonly price = 38.42;
readonly quantity = signal(100);
readonly total = computed(() => (this.quantity() * this.price).toFixed(2));

add(): void { this.quantity.update(value => value + 100); }
remove(): void { this.quantity.update(value => Math.max(0, value - 100)); }`,
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
      'Trocando para `track $index`, o conteúdo digitado ficaria preso à posição, não ao ativo.',
    ],
    code: `@for (ticker of tickers(); track ticker.id) {
  <li>
    <span>{{ ticker.symbol }}</span>
    <input type="text" placeholder="anote algo aqui" />
  </li>
}

// no componente
prepend(): void {
  this.tickers.update(list => [{ id: this.nextId++, symbol }, ...list]);
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
      { name: 'Validators.pattern()', role: 'Regra declarativa reaproveitável.' },
      { name: 'markAllAsTouched()', role: 'Revela os erros ao tentar enviar inválido.' },
    ],
    watch: [
      'Envie vazio: as mensagens aparecem porque o submit marca os campos como touched.',
      'Cada `mat-error` é condicionado ao erro específico, não a um "inválido" genérico.',
    ],
    code: `readonly form = this.fb.nonNullable.group({
  symbol: ['', [Validators.required, Validators.pattern(/^[A-Za-z]{4}\\d$/)]],
  quantity: [100, [Validators.required, Validators.min(100)]],
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
  <span>Nenhum ativo encontrado.</span>
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
      { name: 'interval(ms)', role: 'Fonte periódica usada aqui para simular o feed de preços.' },
    ],
    watch: [
      'O preço muda sozinho a cada 1,5s sem nenhum subscribe manual no componente.',
      'Sem `initialValue`, o tipo do signal incluiria `undefined` até a primeira emissão.',
    ],
    code: `readonly price = toSignal(
  interval(1500).pipe(map(() => this.nextPrice())),
  { initialValue: this.base }
);

readonly variation = computed(
  () => ((this.price() - this.base) / this.base) * 100
);`,
  },
];
