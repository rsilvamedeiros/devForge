# Queues & Messaging

## Nível atual
`Não avaliado`

Nenhum nível atribuído sem evidência registrada.

## Nível alvo
`A definir por vaga`

## Queue como estrutura

FIFO.

## Mensageria

```text
Producer → Broker/Queue → Consumer
```

## Conceitos

- producer
- consumer
- message
- ACK
- retry
- DLQ
- idempotência
- ordering
- concorrência
- backpressure
- particionamento
- escalabilidade

## Cenário financeiro

O consumidor processa uma ordem, persiste, mas cai antes do ACK. A mensagem pode reaparecer. O processamento precisa ser idempotente para evitar efeito financeiro duplicado.

## Tecnologias para conhecer conceitualmente

- RabbitMQ
- Kafka
- AWS SQS

Não decorar produto; entender modelo e trade-offs.

## Gaps conhecidos
- avaliação de domínio pendente.

## Evidências de domínio
- nenhuma evidência registrada.
