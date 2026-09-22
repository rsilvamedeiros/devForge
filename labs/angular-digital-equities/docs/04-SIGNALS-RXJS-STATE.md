# Angular — Signals, RxJS e estado

## Signals

`signal` guarda estado síncrono, `computed` deriva valor e `effect` sincroniza com sistemas externos. Não use `effect` para copiar um Signal para outro.

```ts
assets = signal<Asset[]>([]);
query = signal('');
filtered = computed(() => this.assets().filter(asset => asset.symbol.includes(this.query())));
```

Atualize imutavelmente quando identidade e change detection importarem.

## RxJS

Observable representa sequência ao longo do tempo. Escolha flattening operator pelo requisito:

- `switchMap`: cancela anterior, ideal para busca;
- `concatMap`: preserva ordem;
- `mergeMap`: concorrência;
- `exhaustMap`: ignora novos enquanto executa, útil em submit.

`map` transforma, `filter` seleciona, `scan` acumula, `catchError` define recuperação, `shareReplay` compartilha com cuidado.

## Cleanup

Prefira `async` pipe, `toSignal` ou `takeUntilDestroyed`. Subscription manual sem ownership explícito produz leaks e efeitos depois da destruição.

## Signals versus RxJS

- Signal: estado atual consumido sincronamente pela UI;
- Observable: evento, tempo, cancelamento e composição assíncrona;
- combine ambos nas fronteiras, não converta repetidamente sem necessidade.

## Estado

Mantenha estado próximo do consumidor. Suba para service quando múltiplas features compartilham ownership. Store global só quando regras, tooling e escala justificarem. Sempre modele source of truth, estado derivado e efeitos separadamente.
