# Angular moderno: APIs e direção do framework

Este capítulo separa recursos estáveis no Angular 20 de APIs experimentais ou disponíveis apenas em versões posteriores. Antes de adotar uma API, confirme a versão do projeto e a estabilidade indicada na documentação oficial.

## `linkedSignal`

`linkedSignal` mantém estado gravável relacionado a outra fonte, preservando uma escolha enquanto ela continuar válida. Diferente de `computed`, o valor também pode ser alterado pelo usuário.

```ts
readonly courses = signal<Course[]>([]);
readonly selected = linkedSignal<Course[], Course | undefined>({
  source: this.courses,
  computation: (courses, previous) =>
    courses.find(course => course.id === previous?.value?.id) ?? courses[0]
});
```

Use quando existe seleção reajustável. Para simples derivação, continue usando `computed()`.

## `resource` e `httpResource`

Resources modelam carregamento assíncrono com status, valor e erro reativos. `httpResource` integra esse modelo ao `HttpClient`, incluindo interceptors. No Angular 20, verifique o status experimental antes de usar em contratos críticos.

```ts
readonly courseId = input.required<string>();
readonly course = httpResource<Course>(() => `/api/courses/${this.courseId()}`);
```

Não substitua RxJS indiscriminadamente. Streams de eventos, concorrência sofisticada, WebSockets e composição temporal continuam sendo um ótimo domínio para Observables.

## Zoneless

Zoneless tornou-se estável no Angular 20.2. A aplicação precisa notificar mudanças por APIs reconhecidas: signals lidos no template, `AsyncPipe`, eventos, `setInput` ou `markForCheck`.

```ts
bootstrapApplication(App, {
  providers: [provideZonelessChangeDetection()]
});
```

Antes de migrar, audite integrações com `NgZone`, forms, bibliotecas imperativas e testes. Testes devem permitir que Angular sincronize o estado em vez de depender de `detectChanges()` para esconder notificações ausentes.

## `@defer` e incremental hydration

`@defer` divide conteúdo em lazy chunks. Em aplicações SSR, incremental hydration reutiliza seus gatilhos para hidratar regiões progressivamente e pode usar event replay.

```html
@defer (on viewport; prefetch on idle) {
  <app-course-recommendations />
} @placeholder {
  <app-card-skeleton />
} @loading (minimum 300ms) {
  <app-spinner />
}
```

Teste placeholder, loading, complete e error. Não adie conteúdo necessário ao LCP ou à primeira tarefa do usuário.

## Signal Forms

Signal Forms usam um model signal, `form()` e `[formField]`, com validação orientada a schema. A documentação atual exige Angular 21 ou superior; portanto, neste lab Angular 20 o tema é estudado como direção de evolução, enquanto Reactive Forms continua sendo a base de produção.

## Profiling moderno

- Angular DevTools para árvore, signals e change detection.
- Chrome DevTools com trilha Angular para long tasks e ciclos de renderização.
- Budgets de bundle no CI.
- Web Vitals medidos em usuários reais.
- `@defer`, `NgOptimizedImage`, SSR e zoneless aplicados somente após medição.

## Exercícios recomendados

1. Troque seleção duplicada por `linkedSignal`.
2. Modele loading/error/empty/ready a partir de um Resource snapshot.
3. Teste manualmente os estados de um bloco `@defer`.
4. Audite um componente para compatibilidade zoneless.
5. Compare Reactive Forms e Signal Forms sem esconder a diferença de versão.
