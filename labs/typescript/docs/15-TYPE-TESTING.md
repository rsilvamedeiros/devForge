# Testes de tipos e contratos

Testes runtime provam comportamento JavaScript. Type tests provam inferência, rejeições e ergonomia para quem consome uma API.

## satisfies como assertion

```ts
const value = createCourse({ title: 'TypeScript' });
value satisfies Course;
```

## Rejeição esperada

```ts
// @ts-expect-error quantity não aceita string
createOrder({ quantity: '10' });
```

Ao contrário de `@ts-ignore`, a diretiva falha se o erro desaparecer.

## Igualdade de tipos

```ts
type Equal<A, B> =
  (<T>() => T extends A ? 1 : 2) extends
  (<T>() => T extends B ? 1 : 2) ? true : false;
type Expect<T extends true> = T;
type Case = Expect<Equal<ReturnType<typeof createId>, UserId>>;
```

Use helpers com moderação; o erro deve continuar legível.

## Runtime e compile time

Uma função de parse precisa dos dois níveis:

- type test confirma que retorna `Result<Course, ParseError>`;
- teste Vitest envia payloads válidos e inválidos;
- integração comprova a boundary HTTP real.

## Matriz para bibliotecas

- inferência sem generics explícitos;
- generics fornecidos manualmente;
- casos inválidos rejeitados;
- readonly preservado;
- unions não ampliadas acidentalmente;
- versões mínimas de TypeScript suportadas.

Execute typecheck em CI antes dos testes e do bundle.

