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

## Mapa completo de domínio

### Plataforma e tooling

- Angular CLI, workspace, builders, environments e budgets;
- bootstrap standalone, `ApplicationConfig` e providers;
- TypeScript strict, AOT, assets, bundles e source maps;
- CSR, SSR, hydration e quando cada estratégia importa.

### Componentes e templates

- inputs, outputs, model inputs e composição;
- bindings, eventos, projection e host bindings;
- `@if`, `@for`, `@switch`, `@defer` e tracking;
- lifecycle, queries, directives e pipes;
- Angular Material, CDK, semântica e acessibilidade.

### Dados e navegação

- DI hierárquica, tokens e escopo de providers;
- services, adapters e separação de domínio;
- Reactive Forms tipados e validação síncrona/assíncrona;
- Router, lazy routes, params, guards e resolvers;
- HttpClient, interceptors, DTO mapping, erro e cancelamento.

### Reatividade e estado

- `signal`, `computed`, `effect`, linked state e interoperabilidade;
- Observable, Subject e operadores de flattening;
- cleanup com `async`, `takeUntilDestroyed` e `toSignal`;
- estado local, por feature e global;
- change detection, `OnPush` e execução zoneless.

### Produção

- testes unitários, integração, HTTP e E2E;
- profiling, lazy loading, defer, virtualização e bundle analysis;
- error handling, observabilidade e segurança de frontend;
- arquitetura por feature, boundaries e design system.

## Handbook do laboratório

- [Visão geral](../../../labs/angular/docs/HANDBOOK.md)
- [Fundamentos e plataforma](../../../labs/angular/docs/01-FUNDAMENTALS.md)
- [Componentes e templates](../../../labs/angular/docs/02-COMPONENTS-TEMPLATES.md)
- [DI, dados e navegação](../../../labs/angular/docs/03-DI-DATA-NAVIGATION.md)
- [Signals, RxJS e estado](../../../labs/angular/docs/04-SIGNALS-RXJS-STATE.md)
- [Qualidade e arquitetura](../../../labs/angular/docs/05-QUALITY-ARCHITECTURE.md)

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
- cobertura de SSR/hydration ainda não aplicada no lab;
- execução zoneless ainda não demonstrada;
- exercícios avançados ainda aguardam solução e retrospectiva.

## Evidências de domínio
- nenhuma evidência registrada.
