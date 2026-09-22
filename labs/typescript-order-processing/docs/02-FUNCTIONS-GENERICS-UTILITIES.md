# TypeScript — funções, generics e transformação

## Funções

Modele parâmetros obrigatórios, opcionais, rest, overloads e retorno. Prefira union quando assinaturas compartilham implementação simples; overload quando entrada determina retorno de modo relevante.

## Generics

Generic preserva relação entre tipos. Não use `<T>` apenas para substituir `any` sem relação.

```ts
interface Queue<T> {
  enqueue(item: T): void;
  dequeue(): T | undefined;
}
```

Constraints expressam capacidade mínima: `<T extends { id: string }>`. Defaults melhoram ergonomia quando existe escolha natural.

## `keyof` e indexed access

`keyof T` representa chaves conhecidas; `T[K]` acessa tipo de propriedade. Eles permitem APIs seguras de seleção, ordenação e mapping.

## Utility types

Conheça `Partial`, `Required`, `Readonly`, `Pick`, `Omit`, `Record`, `Exclude`, `Extract`, `NonNullable`, `Parameters`, `ReturnType` e `Awaited`. Use para derivar contratos, não para esconder um modelo confuso.

## Mapped e conditional types

Mapped transforma propriedades; conditional escolhe tipo e pode distribuir sobre unions. `infer` extrai partes. Tipos sofisticados devem ter nome, teste de tipo e benefício claro.

## Variance

Entrada e saída afetam compatibilidade de funções e containers. Em callbacks, tipos de parâmetro merecem atenção especial sob `strictFunctionTypes`.
