# Trilha de aprendizagem — TypeScript Order Processing

## Objetivo

Evoluir de uma fila em memória para um pipeline observável e resiliente, mantendo contratos explícitos e decisões justificáveis.

## Módulo 1 — Modelagem e contratos

**Entrega:** ordem, mensagem, fila genérica e validação.

- unions e interfaces;
- generics;
- imutabilidade seletiva;
- erros de domínio.

## Módulo 2 — Processamento e idempotência

**Entrega:** consumer que evita efeito duplicado.

- composição e injeção de dependência;
- idempotency key;
- separação entre transporte e domínio;
- semânticas at-least-once.

## Módulo 3 — Retry e DLQ

**Entrega:** falhas transitórias retornam e poison messages são isoladas.

- política de tentativas;
- dead-letter queue;
- classificação de falhas;
- testes determinísticos.

## Módulo 4 — Observabilidade visual

**Entrega:** control room com filas, resultados e event log em tempo real.

- métricas derivadas;
- simulação controlável;
- representação visual do pipeline;
- estado da UI sem framework.

## Módulo 5 — Evolução distribuída

**Entrega:** desenho de inbox/outbox, persistência e particionamento.

- consistência e atomicidade;
- backoff com jitter;
- ordenação por chave;
- throughput, latência e backpressure.

## Evidência esperada

Execute cenários de sucesso, retry e DLQ na control room e explique por que o sistema não promete exactly-once. Registre a evidência nas skills de filas, arquitetura e TypeScript.
