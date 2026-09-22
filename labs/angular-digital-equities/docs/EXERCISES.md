# Exercícios — Angular Digital Equities

## 1. Filtro de liquidez

**Nível:** fundamento

Adicione ao mercado um filtro por volume mínimo usando estado derivado.

**Critérios:** Angular Material, `computed`, combinação com busca/setor e teste de comportamento.

## 2. Cancelamento de ordem

**Nível:** aplicação

Permita cancelar apenas ordens ainda não executadas.

**Critérios:** regra no domínio, confirmação na UI, fila consistente e testes para estados permitidos e inválidos.

## 3. Reconexão do price feed

**Nível:** aplicação

Adicione estado de conexão e reconexão com backoff ao feed WebSocket.

**Critérios:** contrato preservado, status visível, cleanup correto e teste com scheduler controlado.

## 4. Guardrail pré-trade

**Nível:** arquitetura

Bloqueie uma ordem que ultrapasse exposição ou concentração configurada.

**Critérios:** regra fora do componente, mensagens acionáveis, testes de fronteira e documentação do trade-off entre validação no cliente e servidor.

## Retrospectiva

Registre decisão, dificuldade, testes e explicação dos trade-offs após cada exercício.
