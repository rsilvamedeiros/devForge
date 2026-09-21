# System Design — processamento de ordens

## Problema
Projetar fluxo simplificado para receber ordens de compra/venda, processar de forma resiliente e atualizar o frontend.

## Perguntas a fazer
- volume?
- latência?
- consistência?
- ordenação?
- duplicidade?
- disponibilidade?
- segurança?
- auditoria?

## Base

```text
Angular → API → Order Service → Queue → Consumer → DB
   ↑                                         │
   └──────── status/WebSocket/event ─────────┘
```

## Falhas a discutir
- API cai;
- queue indisponível;
- consumer cai antes do ACK;
- duplicidade;
- poison message;
- consumer lento;
- pico de volume;
- reconexão WebSocket.
