# TypeScript — objetos, classes e módulos

## Structural typing

Compatibilidade depende da forma, não do nome. Isso facilita adapters, mas tipos semanticamente diferentes com mesma estrutura podem se misturar. Branded types ajudam em IDs, moedas e unidades críticas.

## `type` versus `interface`

Ambos modelam objetos. Interface suporta declaration merging e extensão nominal de contrato; type alias compõe unions, primitives e transformações. Escolha consistência e necessidade, não dogma.

## Classes

Classes existem no runtime. Use constructor, `private`, `protected`, `readonly`, abstract e implements quando comportamento e invariantes justificarem identidade. Para dados simples, objeto + função costuma ser menor.

## Composição

Injete contratos pequenos em vez de heranças profundas. O `OrderProcessor` recebe filas, store e gateway; testes substituem essas dependências sem conhecer detalhes.

## Modules

ES modules têm exports explícitos. Evite barrels que criam ciclos ou escondem dependências. Entenda diferença entre `import type`, import runtime, CommonJS, ESM, `NodeNext` e `Bundler`.

## Declaration files

`.d.ts` descreve código JavaScript ou amplia tipos globais. Não contém implementação. Module augmentation deve ser localizada e documentada.

## API pública

Exporte o mínimo. Um tipo exportado vira contrato de manutenção. Mantenha detalhes internos privados ao módulo/feature.
