# Trilha de aprendizagem — React Service Operations

## Objetivo

Construir uma central de atendimento enquanto pratica o modelo mental do React, estado remoto e fluxos de interface resilientes.

Referência completa: [`HANDBOOK.md`](HANDBOOK.md).

## Módulo 1 — Composição da interface

**Leitura:** [`01-FUNDAMENTALS-COMPOSITION.md`](01-FUNDAMENTALS-COMPOSITION.md).

**Entrega:** shell responsivo, navegação, cards e páginas.

- composição de componentes;
- props tipadas;
- children e reutilização;
- tokens de tema e acessibilidade.

## Módulo 2 — Estado e filtros

**Leitura:** [`02-STATE-HOOKS-FORMS.md`](02-STATE-HOOKS-FORMS.md).

**Entrega:** busca e filtros derivados da fila de tickets.

- `useState` para interação local;
- estado derivado sem `useEffect` desnecessário;
- listas com chaves estáveis;
- sincronização da busca com a URL.

## Módulo 3 — Estado remoto

**Leitura:** [`03-ROUTING-SERVER-STATE.md`](03-ROUTING-SERVER-STATE.md).

**Entrega:** carregamento e cache de tickets com TanStack Query.

- query keys;
- loading, error e empty states;
- invalidação e atualização do cache;
- separação entre API, hooks e UI.

## Módulo 4 — Mutations resilientes

**Leitura:** [`03-ROUTING-SERVER-STATE.md`](03-ROUTING-SERVER-STATE.md).

**Entrega:** atualização otimista de status com rollback.

- ciclo de vida da mutation;
- snapshot do cache;
- feedback de sucesso e falha;
- consistência entre lista e detalhe.

## Módulo 5 — Qualidade e arquitetura

**Leitura:** [`04-ARCHITECTURE-UX.md`](04-ARCHITECTURE-UX.md) e [`05-QUALITY-PERFORMANCE.md`](05-QUALITY-PERFORMANCE.md).

**Entrega:** testes de comportamento e justificativa das decisões.

- Testing Library orientada ao usuário;
- testes de serviço e fluxo;
- fronteiras por feature;
- performance medida antes de otimizar.

## Evidência esperada

Apresente um ticket desde a busca até a resolução, provoque uma falha de mutation e explique como o cache é restaurado. Registre a demonstração na skill React antes de propor mudança de nível.
