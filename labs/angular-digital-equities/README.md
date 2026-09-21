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
├── app.routes.ts                  # '' -> market · market · orders
├── app.config.ts
├── core/
│   ├── models/asset.model.ts
│   ├── mock/assets.mock.ts
│   └── services/asset.service.ts  # signals: assets/loading/error
├── features/
│   ├── market/asset-list/         # listagem + busca + filtro por setor
│   └── orders/orders-placeholder.ts
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
- [ ] Order model
- [ ] form
- [ ] POO domain exercise
- [ ] Queue<T>
- [ ] RxJS stream
- [ ] simulated prices
- [ ] WebSocket abstraction
- [ ] performance review
- [ ] tests
