# Trilha de aprendizagem — Angular Digital Equities

## Objetivo

Construir um terminal financeiro modular enquanto pratica Angular moderno, reatividade, streams e desenho de domínio.

Referência completa: [`HANDBOOK.md`](HANDBOOK.md).

## Módulo 1 — Componentes e navegação

**Leitura:** [`01-FUNDAMENTALS.md`](01-FUNDAMENTALS.md) e [`02-COMPONENTS-TEMPLATES.md`](02-COMPONENTS-TEMPLATES.md).

**Entrega:** shell responsivo e features carregadas por rota.

- standalone components;
- Angular Material;
- lazy loading;
- inputs, outputs e composição.

## Módulo 2 — Signals e estado derivado

**Leitura:** [`04-SIGNALS-RXJS-STATE.md`](04-SIGNALS-RXJS-STATE.md).

**Entrega:** mercado pesquisável, watchlist e indicadores.

- `signal` e `computed`;
- estado local e compartilhado;
- persistência no navegador;
- `OnPush` e identidade de listas.

## Módulo 3 — Formulários e domínio

**Leitura:** [`03-DI-DATA-NAVIGATION.md`](03-DI-DATA-NAVIGATION.md).

**Entrega:** criação e validação de ordens.

- Reactive Forms;
- classes abstratas e polimorfismo;
- validação de domínio;
- fila FIFO genérica.

## Módulo 4 — HTTP e tempo real

**Leitura:** [`03-DI-DATA-NAVIGATION.md`](03-DI-DATA-NAVIGATION.md) e [`04-SIGNALS-RXJS-STATE.md`](04-SIGNALS-RXJS-STATE.md).

**Entrega:** API simulada e preços atualizados continuamente.

- HttpClient e interceptor;
- DTO para modelo de domínio;
- RxJS e ciclo de vida;
- abstração intercambiável de WebSocket.

## Módulo 5 — Risco, performance e testes

**Leitura:** [`05-QUALITY-ARCHITECTURE.md`](05-QUALITY-ARCHITECTURE.md).

**Entrega:** central de risco, analytics e suíte automatizada.

- estado derivado entre features;
- limites e guardrails;
- testes de service, model e UI;
- análise de performance baseada em evidência.

## Evidência esperada

Demonstre uma ordem do formulário até a fila, explique Signals versus RxJS e troque o price feed simulado pela abstração WebSocket. Registre a evidência nas skills correspondentes.
