# TypeScript — configuração, qualidade e arquitetura

## `tsconfig`

Ative `strict`. Entenda `target`, `module`, `moduleResolution`, `lib`, `types`, `rootDir`, `outDir`, `noEmit`, `declaration`, `sourceMap`, `noUncheckedIndexedAccess` e project references.

`skipLibCheck` reduz custo em dependências, mas não deve mascarar erros do próprio código. Config de browser e Node pode exigir projetos separados.

## Build e execução

TypeScript verifica/transpila; bundlers resolvem assets, chunks e otimizações. Node moderno pode executar ESM, mas extensão e resolução precisam coerência. Test runner possui ambiente próprio.

## Testes

Teste runtime e contratos importantes. Vitest/Jest não provam tipos complexos sozinhos; use arquivos de type test quando necessário. Mocks devem implementar o contrato mínimo.

## Performance

Tipos complexos podem degradar editor/build. No runtime, TypeScript não existe: performance depende do JavaScript gerado e do algoritmo. Meça collections, serialização, concorrência e alocação.

## Arquitetura

Use tipos para reforçar boundaries, não substituir design. Domínio não deve importar framework. Adapters traduzem HTTP, fila ou storage. Dependency inversion facilita teste e troca de infraestrutura.

## Entrevista

Consiga explicar `any`/`unknown`/`never`, union/intersection, narrowing, generic constraints, utility/conditional types, structural typing, variance, classes versus composição, ESM/CommonJS, strictness e validação runtime.
