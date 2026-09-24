# TypeScript — validação em runtime

Interfaces desaparecem na compilação. Rede, storage, formulário e variáveis de ambiente continuam sendo `unknown` até validação real.

## Parse, não cast

```ts
type Course = { id: string; title: string };

function parseCourse(value: unknown): Course {
  if (!value || typeof value !== 'object') throw new Error('Course inválido');
  const input = value as Record<string, unknown>;
  if (typeof input.id !== 'string' || typeof input.title !== 'string') {
    throw new Error('Campos obrigatórios ausentes');
  }
  return { id: input.id, title: input.title };
}
```

O cast interno ajuda a inspecionar, mas somente as verificações justificam o retorno como `Course`.

## Type predicate

```ts
function isError(value: unknown): value is Error {
  return value instanceof Error;
}
```

Predicates são promessas feitas ao compilador. Um predicate incorreto cria falsa segurança.

## Result em vez de throw

```ts
type Result<T, E> = { ok: true; value: T } | { ok: false; error: E };
```

Use `Result` quando falha é esperada e o consumidor deve tratá-la. Exceptions continuam úteis para invariantes rompidas.

## Branded types

```ts
type Brand<T, Name extends string> = T & { readonly __brand: Name };
type UserId = Brand<string, 'UserId'>;
```

A função que cria a marca deve validar o valor. A marca não existe no JavaScript emitido.

## Fronteiras obrigatórias

- respostas HTTP;
- `JSON.parse`;
- `localStorage`;
- mensagens de fila;
- parâmetros de processo;
- dados vindos de bibliotecas sem tipos confiáveis.

Nunca use `as DomainType` diretamente em uma fronteira não confiável.

