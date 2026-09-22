# TypeScript para entrevista

## Nível atual
`Não avaliado`

Nenhum nível atribuído sem evidência registrada.

## Nível alvo
`A definir por vaga`

## Prioridades

- interfaces/types
- unions
- narrowing
- generics
- classes
- access modifiers
- readonly
- utility types
- typed collections
- functions
- nullability
- async/await

## Mapa completo de domínio

### Sistema de tipos

- inferência, annotations, literals e `as const`;
- `any`, `unknown`, `never`, `void` e nullability;
- unions, intersections, discriminantes e exhaustiveness;
- narrowing, guards, predicates e assertions;
- structural typing, assignability e variance.

### Composição de tipos

- funções, overloads e callbacks;
- generics, constraints, defaults e relações entre tipos;
- `keyof`, indexed access e `typeof` em type position;
- utility, mapped, conditional e template literal types;
- inferência com `infer` e testes de tipos.

### Código e runtime

- objetos, interfaces, aliases e branded types;
- classes, abstract, modifiers e composição;
- modules, declaration files, ESM e CommonJS;
- Promise, concorrência, cancelamento e erros `unknown`;
- validação runtime, DTO mapping e limites do type erasure.

### Tooling e arquitetura

- `tsconfig`, strictness, target, lib e module resolution;
- build, declaration, source maps e project references;
- testes, lint, performance do compilador e debugging;
- contratos, adapters, dependency inversion e APIs públicas.

## Handbook do laboratório

- [Visão geral](../../../labs/typescript-order-processing/docs/HANDBOOK.md)
- [Sistema de tipos e narrowing](../../../labs/typescript-order-processing/docs/01-TYPE-SYSTEM-NARROWING.md)
- [Funções, generics e utilities](../../../labs/typescript-order-processing/docs/02-FUNCTIONS-GENERICS-UTILITIES.md)
- [Objetos, classes e módulos](../../../labs/typescript-order-processing/docs/03-OBJECTS-CLASSES-MODULES.md)
- [Async, erros e runtime](../../../labs/typescript-order-processing/docs/04-ASYNC-ERRORS-RUNTIME.md)
- [Configuração e arquitetura](../../../labs/typescript-order-processing/docs/05-CONFIG-QUALITY-ARCHITECTURE.md)

## Coleções

```ts
const assets: Asset[] = [];
const byTicker = new Map<string, Asset>();
const selected = new Set<string>();
```

## Live coding

Preferir código simples e tipado. Não criar arquitetura excessiva para exercício algorítmico.

## Gaps conhecidos
- avaliação de domínio pendente.
- branded types e type tests ainda não aplicados no lab;
- persistência inbox/outbox continua como módulo futuro;
- exercícios avançados ainda aguardam solução e retrospectiva.

## Evidências de domínio
- nenhuma evidência registrada.
