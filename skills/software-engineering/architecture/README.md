# Architecture / System Design

## Nível atual
`Não avaliado`

Nenhum nível atribuído sem evidência registrada.

## Nível alvo
`A definir por vaga`

## Método

Antes de escolher tecnologia:
1. requisitos funcionais;
2. volume;
3. latência;
4. consistência;
5. disponibilidade;
6. falhas;
7. segurança;
8. observabilidade.

## Exercício Digital Equities

```text
Angular
  ↓
API Gateway
  ↓
Order Service
  ↓
Queue
  ↓
Order Processor
  ↓
Database
```

Dados de mercado:

```text
Market Data → WebSocket → Angular
```

## Perguntas

- e se o serviço cair?
- e se duplicar mensagem?
- e se o consumer ficar lento?
- como preservar ordem?
- como escalar?
- como monitorar?
- como devolver status ao frontend?

## Gaps conhecidos
- avaliação de domínio pendente.

## Evidências de domínio
- nenhuma evidência registrada.
