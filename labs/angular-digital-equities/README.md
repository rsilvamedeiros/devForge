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

## Roadmap

- [ ] bootstrap Angular
- [ ] Asset model
- [ ] mock data
- [ ] `@for` + track
- [ ] Signal
- [ ] computed search/filter
- [ ] HttpClient abstraction
- [ ] loading/error/empty
- [ ] Order model
- [ ] form
- [ ] POO domain exercise
- [ ] Queue<T>
- [ ] RxJS stream
- [ ] simulated prices
- [ ] WebSocket abstraction
- [ ] performance review
- [ ] tests
