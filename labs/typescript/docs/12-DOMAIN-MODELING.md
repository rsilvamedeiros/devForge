# Modelagem de domínio com TypeScript

O melhor tipo não descreve apenas dados: ele impede estados inválidos e orienta transições legítimas.

## União discriminada

```ts
type Enrollment =
  | { status: 'draft'; courseId: CourseId }
  | { status: 'active'; courseId: CourseId; startedAt: Date }
  | { status: 'completed'; courseId: CourseId; certificateId: CertificateId };
```

Campos exclusivos existem apenas no estado em que fazem sentido. Isso supera objetos com vários booleanos opcionais.

## Exaustividade

```ts
function assertNever(value: never): never {
  throw new Error(`Estado não tratado: ${JSON.stringify(value)}`);
}
```

Use no `default` para que um novo membro da união provoque erro de compilação nos consumidores incompletos.

## Value objects e marcas

```ts
declare const courseIdBrand: unique symbol;
type CourseId = string & { readonly [courseIdBrand]: true };
```

A factory valida e cria a marca. Nunca espalhe casts pela aplicação.

## Result

```ts
type Result<T, E> =
  | { ok: true; value: T }
  | { ok: false; error: E };
```

Result torna falhas esperadas parte da assinatura. Exceptions continuam adequadas para invariantes rompidas ou falhas inesperadas.

## Entidades e DTOs

Não use diretamente o DTO externo como modelo interno. Parseie, normalize datas, aplique marcas e elimine estados ausentes na boundary.

## Evolução

- adicione membros de union conscientemente;
- preserve compatibilidade de dados persistidos;
- use funções de migração entre versões;
- documente invariantes que o tipo sozinho não prova.

