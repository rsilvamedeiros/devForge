# Angular — componentes e templates

## Contrato do componente

Um componente deve ter responsabilidade de UI clara, API pequena e template legível. Prefira composição a componentes gigantes.

```ts
price = input.required<number>();
selected = output<string>();
change = computed(() => this.price() - this.previousPrice());
```

Use inputs para dados do pai, outputs para eventos e services para colaboração que não pertence à hierarquia visual.

## Binding

- `{{ value }}`: texto;
- `[property]`: propriedade DOM/componente;
- `(event)`: evento;
- `[(ngModel)]`: two-way binding, útil em casos simples, não padrão universal.

## Control flow

Use `@if`, `@for`, `@switch` e `@defer`. Em listas mutáveis, `track` deve representar identidade de domínio, nunca posição.

```html
@for (asset of assets(); track asset.symbol) {
  <app-asset-row [asset]="asset" />
} @empty { <app-empty-state /> }
```

## Lifecycle e queries

Use hooks quando a operação depende do ciclo da view. Prefira APIs reativas para derivação. `viewChild` e `contentChild` conectam elementos/children, mas excesso costuma indicar acoplamento.

## Projeção e diretivas

`ng-content` cria componentes compostos. Diretivas encapsulam comportamento DOM reutilizável. Pipes devem ser puros sempre que possível.

## Acessibilidade

HTML semântico vem antes de ARIA. Preserve teclado, foco, nomes acessíveis, contraste e feedback de erro. Componentes Material ajudam, mas não garantem contexto correto.
