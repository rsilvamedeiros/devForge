# TypeScript — tipos avançados

Tipos avançados transformam contratos existentes. Use-os para preservar relações reais, não para criar desafios indecifráveis.

## Indexed access e keyof

```ts
function get<T, K extends keyof T>(object: T, key: K): T[K] {
  return object[key];
}
```

`K` só aceita chaves de `T`; `T[K]` preserva o tipo exato do valor.

## Mapped types

```ts
type FormState<T> = {
  [K in keyof T]: { value: T[K]; error?: string };
};
```

Modifiers podem ser adicionados ou removidos com `readonly`, `?`, `-readonly` e `-?`.

## Conditional types

```ts
type ApiResult<T> = T extends Error
  ? { ok: false; error: T }
  : { ok: true; data: T };
```

Quando o parâmetro genérico nu recebe uma union, o conditional distribui para cada membro. Envolva os lados em tuplas para impedir distribuição.

## infer

```ts
type Resolved<T> = T extends Promise<infer Value>
  ? Resolved<Value>
  : T;
```

`infer` declara uma variável de tipo dentro do padrão sendo comparado.

## Template literal types

```ts
type EventName<Entity extends string> = `${Entity}.created` | `${Entity}.updated`;
type CourseEvent = EventName<'course'>;
```

São úteis para rotas, eventos e nomes derivados. Unions muito grandes aumentam custo do compilador.

## satisfies

```ts
const routes = {
  home: '/',
  course: '/courses/:id'
} satisfies Record<string, `/${string}`>;
```

O operador valida o contrato e preserva os literais inferidos, ao contrário de uma annotation ampla.

## Checklist

- O tipo preserva uma relação existente?
- A mensagem de erro continua compreensível?
- Uma função comum resolveria com menos complexidade?
- Há type tests para casos positivos e negativos?

