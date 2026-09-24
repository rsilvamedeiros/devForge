# Trilha de aprendizagem — TypeScript Academy

## Objetivo

Evoluir da leitura de tipos básicos para modelagem, runtime safety, bibliotecas e arquitetura. Cada módulo exige conceito, prática, explicação e evidência.

## Fase 1 — fundamentos

### 1. Modelo mental e inferência

Entenda análise estática, emissão JavaScript, annotations, inference e contextual typing.

**Entrega:** remover annotations redundantes de um exemplo sem perder segurança.

### 2. Unions e narrowing

Pratique `typeof`, `instanceof`, `in`, predicates, discriminated unions e `never`.

**Entrega:** estados de request impossíveis de combinar incorretamente.

### 3. Funções e contratos

Estude signatures, callbacks, overloads, `this`, optional parameters e variance.

**Entrega:** API de parsing cujos retornos dependem das entradas.

## Fase 2 — aplicação

### 4. Objetos e domínio

Compare `interface` e `type`, structural typing, readonly, classes, composição e brands.

**Entrega:** entidades separadas dos DTOs externos.

### 5. Generics

Use constraints, `keyof`, indexed access, defaults e inferência entre argumentos.

**Entrega:** `pick`, `pluck` e event emitter type-safe.

### 6. Transformações de tipos

Mapped, conditional, distributivity, `infer`, templates e utilities.

**Entrega:** EventMap, DeepReadonly e RouteParams com type tests.

### 7. Runtime safety

Valide `unknown`, modele Result, aplique schemas/parsers e proteja boundaries.

**Entrega:** parser de API que retorna erros com caminho do campo.

## Fase 3 — engenharia

### 8. Async e concorrência

Promises, AbortSignal, pools, async iterators, erro e idempotência.

**Entrega:** pool limitado e cancelável com testes determinísticos.

### 9. Módulos e bibliotecas

ESM, declarations, exports, API pública, SemVer e consumo externo.

**Entrega:** package mínimo com subpath export e type tests.

### 10. Configuração e arquitetura

Strict flags, module resolution, project references, boundaries e performance do compilador.

**Entrega:** tsconfig base justificado e grafo sem import circular.

### 11. Testes e qualidade

Integre Vitest, compile-time assertions, `@ts-expect-error`, lint e CI.

**Entrega:** matriz de testes runtime e type-level para uma API genérica.

### 12. TypeScript no navegador

LitElement, propriedades reativas, eventos tipados, lifecycle, Shadow DOM e slots.

**Entrega:** Web Component acessível com propriedade discriminada e evento tipado.

## Ordem de prática

Para cada módulo:

1. leia o capítulo correspondente;
2. reproduza exemplos sem copiar;
3. resolva um Type Challenge na Academy;
4. execute um exercício do mesmo nível;
5. escreva um caso inválido que deve falhar na compilação;
6. explique a decisão e uma alternativa.

## Critério de domínio

- **Júnior:** lê erros, usa unions e evita `any`.
- **Pleno:** projeta generics, valida runtime e mantém APIs claras.
- **Sênior:** controla boundaries, evolução, custo do compilador e contratos públicos.

## Evidência final

O estudante deve concluir os 12 módulos, resolver os 12 Type Challenges, atingir ao menos 80% na avaliação e defender o estudo de caso explicando onde os tipos terminam e o runtime começa.
