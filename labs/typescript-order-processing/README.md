# TypeScript Order Processing Lab

Laboratório de arquitetura orientada a eventos para praticar processamento resiliente de ordens.

O **Pulse Queue** adiciona uma control room visual ao pipeline: é possível enfileirar ordens, interromper o gateway, observar retries, levar poison messages à DLQ e acompanhar o event log.

## Objetivo

Transformar o exercício de system design em código executável, sem simular um broker de produção.

```text
Producer → Main Queue → Order Processor
                         ├── sucesso → Idempotency Store
                         ├── falha transitória → Retry Queue
                         └── limite excedido → Dead-letter Queue
```

## Skills exercitadas

- TypeScript strict e generics;
- POO, composição e injeção de dependências;
- filas FIFO;
- retry e dead-letter queue;
- idempotência;
- tratamento de falhas;
- testes automatizados;
- decisões de arquitetura e trade-offs.

## Cenários cobertos

1. Mensagens são consumidas em FIFO.
2. Uma mensagem processada não produz efeito novamente.
3. Falhas transitórias retornam para retry.
4. Mensagens que excedem o limite vão para a DLQ.
5. O estado do pedido muda somente após processamento bem-sucedido.

## Experiência de aprendizagem

- [`docs/LEARNING-PATH.md`](docs/LEARNING-PATH.md) evolui contratos até arquitetura distribuída;
- [`docs/EXERCISES.md`](docs/EXERCISES.md) cobre erros tipados, backoff, replay e inbox/outbox;
- a control room representa filas, métricas e resultados em tempo real;
- a documentação permanente está nas skills de [TypeScript](../../skills/frontend/typescript/README.md), [filas](../../skills/software-engineering/queues-messaging/README.md) e [arquitetura](../../skills/software-engineering/architecture/README.md).

## Executar

```bash
npm install
npm test
npm run build
npm start     # control room visual
npm run cli   # cenário mínimo no terminal
```

Na raiz do DevForge, use `npm run dev:typescript`, `npm run build:typescript` e `npm run test:typescript`.

## Limites didáticos

- filas e stores vivem em memória;
- não há garantia distribuída;
- não há persistência em banco;
- não há concorrência entre consumers;
- “exactly once” não é prometido: o exemplo usa processamento idempotente.

## Próximas evoluções

- persistência de inbox/outbox;
- backoff exponencial;
- métricas de throughput e latência;
- múltiplos consumers e particionamento por conta;
- endpoint HTTP produtor;
- status por WebSocket para o Angular Digital Equities.
