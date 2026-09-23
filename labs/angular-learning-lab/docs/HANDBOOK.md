# Handbook Angular

Referência do laboratório para estudar Angular moderno do modelo mental à arquitetura. Leia os capítulos em ordem na primeira passagem; depois use-os por assunto.

## Mapa

1. **Fundamentos e plataforma** — bootstrap, standalone, estrutura, TypeScript e ciclo de renderização.
2. **Componentes e templates** — composição, bindings, control flow, queries e lifecycle.
3. **DI, dados e navegação** — providers, services, forms, Router, HttpClient e interceptors.
4. **Signals, RxJS e estado** — reatividade síncrona, streams, interoperabilidade e ownership.
5. **Qualidade e arquitetura** — testes, performance, acessibilidade, segurança e organização.
6. **Forms, Router e HTTP** — formulários tipados, navegação, guards, resolvers e acesso a dados.
7. **Testing** — pirâmide, TestBed, harnesses, HTTP testing e fluxos assíncronos.
8. **Performance, segurança e SSR** — bundles, rendering, hydration e fronteiras de confiança.
9. **Diretivas, pipes e lifecycle** — comportamento reutilizável, hooks, queries e render callbacks.
10. **Composição avançada** — projection, templates, outlets, overlays e componentes dinâmicos.
11. **Acessibilidade e i18n** — semântica, foco, ARIA, locale, tradução e RTL.
12. **Libraries e workspaces** — packaging, APIs públicas, design systems e monorepos.
13. **Operação** — debugging, observabilidade, deploy, cache e upgrades.

## Competência esperada

Ao terminar, você deve conseguir:

- criar uma feature standalone e carregá-la por rota;
- decidir entre input, service, Signal e Observable;
- construir formulário tipado e mapear DTO para domínio;
- controlar subscriptions e efeitos colaterais;
- explicar change detection, `OnPush`, tracking e lazy loading;
- testar componentes, services, HTTP e código assíncrono;
- identificar riscos de XSS, estado global excessivo e acoplamento.

## Aplicação no lab

O Angular Learning Lab usa standalone components, Angular Material, Signals, Reactive Forms, HttpClient, RxJS, lazy routes e `OnPush`. Procure cada conceito no código, observe as demonstrações e execute os exercícios relacionados.

## Estratégia de profundidade

Cada capítulo combina modelo mental, APIs, exemplo e critérios de decisão. Use a referência oficial para assinatura exata e mudanças de versão; use este handbook para entender como as peças se conectam em aplicações profissionais. A biblioteca deve evoluir sempre que uma API relevante, uma prática consolidada ou uma nova exigência de produção entrar no ecossistema.
