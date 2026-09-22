# Trilha de aprendizagem — React Service Operations

## Objetivo

Construir uma central de atendimento enquanto pratica o modelo mental do React, estado remoto e fluxos de interface resilientes.

## Módulo 1 — Composição da interface

**Entrega:** shell responsivo, navegação, cards e páginas.

- composição de componentes;
- props tipadas;
- children e reutilização;
- tokens de tema e acessibilidade.

## Módulo 2 — Estado e filtros

**Entrega:** busca e filtros derivados da fila de tickets.

- `useState` para interação local;
- estado derivado sem `useEffect` desnecessário;
- listas com chaves estáveis;
- sincronização da busca com a URL.

## Módulo 3 — Estado remoto

**Entrega:** carregamento e cache de tickets com TanStack Query.

- query keys;
- loading, error e empty states;
- invalidação e atualização do cache;
- separação entre API, hooks e UI.

## Módulo 4 — Mutations resilientes

**Entrega:** atualização otimista de status com rollback.

- ciclo de vida da mutation;
- snapshot do cache;
- feedback de sucesso e falha;
- consistência entre lista e detalhe.

## Módulo 5 — Qualidade e arquitetura

**Entrega:** testes de comportamento e justificativa das decisões.

- Testing Library orientada ao usuário;
- testes de serviço e fluxo;
- fronteiras por feature;
- performance medida antes de otimizar.

## Evidência esperada

Apresente um ticket desde a busca até a resolução, provoque uma falha de mutation e explique como o cache é restaurado. Registre a demonstração na skill React antes de propor mudança de nível.
