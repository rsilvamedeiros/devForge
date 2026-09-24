# Lifecycle, change detection e rendering

O lifecycle descreve quando Angular cria, atualiza, renderiza e destrói uma view. Dominar a ordem evita estado duplicado, erros de expressão alterada e trabalho excessivo.

## Ordem essencial

1. `constructor`: injeção e inicialização local, sem depender de inputs.
2. `ngOnChanges`: reage a mudanças de inputs tradicionais.
3. `ngOnInit`: inicialização após os primeiros inputs.
4. `ngAfterContentInit`: conteúdo projetado disponível.
5. `ngAfterViewInit`: view e queries disponíveis.
6. `ngOnDestroy`: cleanup final.

Evite `ngDoCheck`, `ngAfterContentChecked` e `ngAfterViewChecked` para lógica cotidiana; são chamados muitas vezes.

## Render callbacks

`afterNextRender` executa após a próxima renderização. `afterEveryRender` acompanha renderizações posteriores. São a fronteira adequada para leitura e escrita manual no DOM e não executam durante SSR.

```ts
constructor() {
  const chart = viewChild.required<ElementRef>('chart');
  afterNextRender({
    write: () => chart().nativeElement.style.height = '240px',
    read: () => chart().nativeElement.getBoundingClientRect()
  });
}
```

Separar escrita e leitura reduz layout thrashing.

## Change detection

Com `OnPush`, Angular atualiza o componente quando um input recebe nova referência, um evento ocorre, um signal lido no template muda ou uma fonte do `AsyncPipe` emite. Trate inputs como imutáveis.

```ts
changeDetection: ChangeDetectionStrategy.OnPush

readonly filtered = computed(() =>
  this.items().filter(item => item.title.includes(this.query()))
);
```

Não use `effect()` para copiar um signal para outro. Estado derivado pertence a `computed()`. Effects sincronizam com sistemas externos, como storage, analytics ou APIs imperativas.

## Queries e cleanup

Use `viewChild`, `viewChildren`, `contentChild` e `contentChildren` apenas ao interagir com elementos ou filhos. Prefira inputs/outputs para regras. `DestroyRef.onDestroy`, `takeUntilDestroyed()` e recursos gerenciados pelo template evitam vazamentos.

## Diagnóstico

- Expressão alterada após verificação: estado foi mutado tarde no mesmo ciclo.
- View desatualizada em `OnPush`: objeto pode ter sido mutado sem nova referência.
- Renderização lenta: procure funções no template, listas sem `track`, effects em cascata e DOM medido repetidamente.
