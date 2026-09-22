# Angular Digital Equities Lab

Projeto didático para integrar as skills da preparação.

## Não é
Uma simulação fiel de infraestrutura bancária.

## É
Um laboratório para praticar:
- Angular moderno;
- TypeScript;
- arrays;
- estado;
- RxJS;
- POO;
- filas;
- real time;
- performance.

## Features

### Market
- listar ativos;
- buscar;
- filtrar;
- ordenar;
- estado derivado;
- atualização de preço.

### Orders
- criar ordem;
- validar;
- listar;
- atualizar status;
- modelar Buy/Sell;
- Queue didática.

### Real time
- atualização simulada;
- depois abstração WebSocket.

### Overview, Portfolio e Analytics
- dashboard com KPIs e curva patrimonial;
- posições consolidadas e alocação por setor;
- métricas de performance, risco e frequência operacional;
- gráficos SVG responsivos, sem biblioteca adicional.

## Estrutura sugerida

```text
src/app/
├── core/
│   ├── models/
│   ├── services/
│   └── interceptors/
├── features/
│   ├── market/
│   └── orders/
└── shared/
```

## UI

[Angular Material](https://material.angular.dev) com tema Material 3 customizado, densidade compacta e identidade visual de terminal financeiro. Tipografia: Manrope para interface e DM Mono para valores. `provideAnimationsAsync()` está registrado em `app.config.ts`.

Componentes já em uso: `MatToolbar` (header), `MatSidenav` + `MatNavList` (sidebar), `MatFormField`/`MatInput`/`MatSelect` (busca e filtro), `MatTable` (listagens), `MatButton`/`MatButtonToggle` (ações e escolha compra/venda), `MatCard` (agrupamento do formulário de ordem), `MatProgressSpinner` (loading). Evoluir tela nova = puxar o módulo do componente Material equivalente antes de estilizar à mão.

## Rodando o projeto

Gerado com Angular CLI 20.3.37 (standalone, sem SSR, SCSS).

```bash
npm install
ng serve      # http://localhost:4200
ng test       # Karma/Jasmine
ng build      # dist/
ng generate component features/market/asset-list
```

## Estrutura real

O app é uma plataforma de estudos com shell fixo (header + sidebar + conteúdo roteado), não uma página única:

```text
src/app/
├── app.ts / app.html / app.scss   # shell: header + sidebar + <router-outlet>
├── app.routes.ts                  # overview · market · orders · portfolio · analytics
├── app.config.ts
├── core/
│   ├── models/asset.model.ts
│   ├── models/order.model.ts      # Order abstrata + BuyOrder/SellOrder (POO)
│   ├── mock/assets.mock.ts
│   ├── queue/queue.ts             # Queue<T> genérica (FIFO)
│   ├── realtime/
│   │   ├── price-feed.ts          # interface PriceFeed + InjectionToken PRICE_FEED (default: SimulatedPriceFeed)
│   │   ├── simulated-price-feed.ts# implementação atual (RxJS interval + jitter)
│   │   └── websocket-price-feed.ts# implementação alternativa via WebSocket real (não é a default; exige servidor)
│   └── services/
│       ├── asset.service.ts       # signals: assets/loading/error + assina o PriceFeed
│       └── order.service.ts       # fila de ordens + processamento FIFO simulado
├── features/
│   ├── overview/                  # dashboard, KPIs, movers e curva patrimonial
│   ├── portfolio/                 # posições, resultado e alocação
│   ├── analytics/                 # performance, risco e frequência
│   ├── market/asset-list/         # listagem + busca + filtro por setor
│   └── orders/
│       ├── order-form/            # Reactive Forms
│       ├── order-list/            # blotter de ordens
│       └── orders-page/           # container da rota /orders
└── shared/layout/
    ├── header/
    └── sidebar/                   # navegação entre features
```

Cada nova feature entra como uma rota lazy (`loadComponent`) + um item em `shared/layout/sidebar/sidebar.ts`.

## Roadmap

- [x] bootstrap Angular
- [x] app shell (header + sidebar + content, navegação por rotas)
- [x] Asset model
- [x] mock data
- [x] `@for` + track
- [x] Signal
- [x] computed search/filter
- [x] loading/error/empty
- [ ] HttpClient abstraction (hoje é mock com latência simulada)
- [x] Order model (classe abstrata `Order` + `BuyOrder`/`SellOrder`, taxa via polimorfismo)
- [x] form (Reactive Forms em `order-form`)
- [x] POO domain exercise (abstração/herança/polimorfismo em `order.model.ts`)
- [x] Queue<T> (FIFO genérica em `core/queue/queue.ts`, usada por `OrderService` para processar ordens uma a uma)
- [x] RxJS stream (`interval` + `map` em `SimulatedPriceFeed`)
- [x] simulated prices (Market atualiza preços ao vivo a cada 1.5s, com jitter)
- [x] WebSocket abstraction (`WebSocketPriceFeed` implementa `PriceFeed` com `rxjs/webSocket`; troca-se via `{ provide: PRICE_FEED, useClass: WebSocketPriceFeed }` em `app.config.ts` quando houver um servidor real — não é a implementação default)
- [x] performance review (`ChangeDetectionStrategy.OnPush` em todos os componentes, coerente com o app ser 100% orientado a signals; rotas de feature já eram lazy via `loadComponent`)
- [x] tests (30 specs cobrindo model, queue, services e price feeds — `ng test`)
