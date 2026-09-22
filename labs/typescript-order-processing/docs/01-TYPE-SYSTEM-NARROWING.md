# TypeScript — sistema de tipos e narrowing

## Inferência

Permita inferência local quando o valor torna o tipo óbvio; anote fronteiras públicas, parâmetros e retornos relevantes. `any` desliga verificação e se espalha. Prefira `unknown` para dados ainda não validados.

## Union e interseção

Union representa alternativas; interseção combina requisitos. Discriminated unions modelam estados com segurança.

```ts
type RequestState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: Error };
```

Isso evita `data?`, `error?` e combinações inválidas.

## Narrowing

Use `typeof`, `instanceof`, `in`, comparação de discriminante e type predicates. Assertion (`as`) não valida nada; apenas silencia o compilador.

## Exhaustiveness

`never` confirma que todos os casos foram tratados.

```ts
function assertNever(value: never): never { throw new Error(`Unexpected: ${value}`); }
```

## Nullability e literal types

Com `strictNullChecks`, ausência é explícita. Use optional somente quando ausência é válida. `as const` preserva literais e readonly superficial.

## Limites

Tipos são apagados no runtime. JSON, storage, URL, eventos e APIs precisam validação real antes de entrar no domínio.
