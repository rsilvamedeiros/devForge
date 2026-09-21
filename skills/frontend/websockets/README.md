# WebSockets

## Caso Digital Equities

Preços de ativos podem mudar continuamente.

```text
Market Data → WebSocket → Observable/Service → State → Component
```

Revisar:
- conexão;
- mensagens;
- reconexão;
- erro;
- cleanup;
- atualização eficiente;
- throttling/batching quando necessário.
