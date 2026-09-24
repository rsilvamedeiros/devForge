# Linha do tempo do TypeScript

TypeScript evolui em duas frentes: acompanha o JavaScript e amplia a capacidade de provar contratos antes do runtime. Estudar versões ajuda a entender por que certos padrões existem, quando uma configuração passou a ser segura e quais mudanças exigem atenção em upgrades.

## Estratégia de atualização

1. Leia as release notes entre a versão atual e a desejada.
2. Atualize primeiro o compilador, mantendo o restante do toolchain estável.
3. Execute `tsc --noEmit`, testes de runtime e testes de tipos.
4. Trate novas análises como bugs potenciais, não como ruído a ser silenciado.
5. Atualize ESLint, bundler, test runner e ferramentas que usam a Compiler API.
6. Registre decisões e mantenha o `tsconfig.json` explícito.

## As quatro eras

### Fundação — 1.0 a 1.6

A linguagem estabiliza interfaces, classes e tipagem estrutural. Union types, aliases, JSX, intersections e guards definidos pelo usuário estabelecem a base da modelagem usada hoje.

### Sistema de tipos — 2.0 a 4.5

`strictNullChecks`, control-flow analysis, `never`, `keyof`, mapped types, conditional types, `infer`, `unknown`, optional chaining, variadic tuples e template literal types transformam TypeScript em uma linguagem de modelagem sofisticada.

### TypeScript moderno — 4.9 a 5.9

`satisfies`, decorators padronizados, `const` type parameters, `using`, `NoInfer`, predicates inferidos e opções mais seguras aproximam o tipo da intenção sem sacrificar inferência.

### Transição nativa — 6.0 e 7.0

O 6.0 moderniza defaults, concentra depreciações e prepara a compatibilidade. O 7.0 troca a implementação JavaScript por um compilador e language service nativos, com grande ganho de desempenho. Ferramentas baseadas na Compiler API precisam de atenção porque a API não acompanha a primeira versão 7.0.

## Matriz rápida de marcos

| Versão | Marco | Pergunta de revisão |
|---|---|---|
| 1.4 | Union types | O domínio tem alternativas explícitas? |
| 2.0 | `strictNullChecks` e análise de fluxo | A ausência está modelada? |
| 2.1 | `keyof` e mapped types | Há contratos duplicados que podem ser derivados? |
| 2.8 | Conditional types e `infer` | A transformação preserva relações? |
| 3.0 | `unknown` e project references | Fronteiras e builds são seguros? |
| 3.7 | `?.`, `??` e assertion functions | Nullish e falsy estão diferenciados? |
| 4.1 | Template literal types | Strings de domínio podem ser verificadas? |
| 4.9 | `satisfies` | Configurações mantêm tipos literais? |
| 5.0 | Decorators padrão e const generics | Há dependência de decorators legados? |
| 5.5 | Predicados inferidos | Filtros preservam narrowing? |
| 5.9 | `import defer` e `node20` | Bundler e runtime suportam a estratégia? |
| 6.0 | Defaults modernos e depreciações | O projeto está pronto para o compilador nativo? |
| 7.0 | Compilador nativo | Alguma ferramenta depende da Compiler API antiga? |

## Laboratório de migração

Faça uma branch dedicada, registre o tempo de build antes da mudança e crie uma baseline com `tsc --noEmit`. Atualize uma major por vez quando houver mudanças relevantes. Para 7.0, passe pelo 6.0, resolva depreciações e compare a ordenação dos tipos com `stableTypeOrdering`.

```json
{
  "compilerOptions": {
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noUncheckedSideEffectImports": true,
    "verbatimModuleSyntax": true
  }
}
```

## Fontes oficiais

- [TypeScript release notes](https://www.typescriptlang.org/docs/handbook/release-notes/overview.html)
- [Announcing TypeScript 6.0](https://devblogs.microsoft.com/typescript/announcing-typescript-6-0/)
- [Announcing TypeScript 7.0](https://devblogs.microsoft.com/typescript/announcing-typescript-7-0/)
- [TypeScript native port](https://devblogs.microsoft.com/typescript/typescript-native-port/)

Use a linha do tempo interativa da Academy para estudar cada marco, comparar impacto e selecionar a próxima migração.
