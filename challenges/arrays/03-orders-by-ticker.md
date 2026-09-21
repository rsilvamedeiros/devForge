# Volume por ticker

Dadas ordens:

```ts
[
  { ticker: 'PETR4', quantity: 100, price: 32 },
  { ticker: 'VALE3', quantity: 50, price: 60 },
  { ticker: 'PETR4', quantity: 200, price: 31 }
]
```

Calcule o volume financeiro por ticker.

Esperado:
- PETR4 = 9400
- VALE3 = 3000

## Evoluções
- usar reduce;
- usar Map;
- receber milhões de ordens;
- receber stream;
- preservar ordem;
- processar em fila;
- atualizar UI em tempo real.
