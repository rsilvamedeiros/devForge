# Exercícios — TypeScript Order Processing

## 1. Erros tipados

**Nível:** fundamento

Crie erros distintos para validação, indisponibilidade e rejeição permanente.

**Critérios:** narrowing explícito, mensagens úteis e testes para cada categoria.

## 2. Backoff exponencial

**Nível:** aplicação

Implemente agendamento de retry com backoff e jitter injetáveis.

**Critérios:** relógio testável, limite configurável, nenhum `setTimeout` dentro do domínio e testes determinísticos.

## 3. Replay da DLQ

**Nível:** aplicação

Permita inspecionar e reenfileirar uma mensagem da DLQ após correção operacional.

**Critérios:** preservar histórico, gerar evento de auditoria e impedir replay duplicado.

## 4. Inbox/outbox persistente

**Nível:** arquitetura

Desenhe e implemente uma versão com persistência local que torne consumo e efeito atômicos.

**Critérios:** ADR curto, estratégia de migração, teste de crash entre etapas e discussão de limites de consistência.

## Retrospectiva

Registre decisões, falhas encontradas, métricas observadas e os trade-offs de cada exercício.
