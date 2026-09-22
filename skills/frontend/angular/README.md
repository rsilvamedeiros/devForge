# Angular

## Nível atual
`Não avaliado`

Nenhum nível atribuído sem evidência registrada.

## Nível alvo
`A definir por vaga`

## Foco da preparação

- standalone components
- component composition
- services
- dependency injection
- HttpClient
- routing/guards/interceptors
- reactive forms
- Signals
- computed/effect
- RxJS
- state
- `@for` + `track`
- change detection
- OnPush
- lazy loading
- performance
- testing

## Ponte com fundamentos

```text
Array.filter → estado derivado → computed
Array.map    → atualização imutável → Signal.update
API          → HttpClient → Observable
lista        → @for + track
stream       → RxJS/WebSocket
POO          → services/DI/domain
```

## Exemplo

```ts
assets = signal<Asset[]>([]);

activeAssets = computed(() =>
  this.assets().filter(asset => asset.active)
);

updatePrice(id: string, price: number) {
  this.assets.update(items =>
    items.map(item =>
      item.id === id ? { ...item, price } : item
    )
  );
}
```

## Gaps conhecidos
- avaliação de domínio pendente.

## Evidências de domínio
- nenhuma evidência registrada.
