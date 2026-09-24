# Async e concorrência tipada

`async` sempre retorna Promise. Tipos descrevem o valor final, mas políticas de cancelamento, concorrência e erro continuam decisões explícitas.

## Promise

```ts
async function loadCourse(id: CourseId, signal: AbortSignal): Promise<Course> {
  const response = await fetch(`/api/courses/${id}`, { signal });
  if (!response.ok) throw new HttpError(response.status);
  return parseCourse(await response.json());
}
```

O tipo `Course` só é legítimo depois do parse do payload `unknown`.

## Concorrência

`Promise.all` falha rápido e preserva a ordem das entradas. `Promise.allSettled` coleta todos os resultados. Execução sequencial com `for...of` é necessária quando há dependência ou limite operacional.

## Pool limitado

```ts
async function mapPool<T, R>(items: T[], limit: number, task: (item: T) => Promise<R>): Promise<R[]> {
  const results: R[] = new Array(items.length);
  let cursor = 0;
  async function worker() {
    while (cursor < items.length) {
      const index = cursor++;
      results[index] = await task(items[index]!);
    }
  }
  await Promise.all(Array.from({ length: Math.min(limit, items.length) }, worker));
  return results;
}
```

## Cancelamento

Propague `AbortSignal` por todas as camadas capazes de cancelar. Cancelamento não deve aparecer como erro genérico ao usuário.

## Async iterators

```ts
async function* pages(): AsyncGenerator<Course[]> {
  for (let page = 1; ; page++) {
    const result = await loadPage(page);
    if (!result.length) return;
    yield result;
  }
}
```

São úteis para streaming, paginação e consumo sob demanda.

## Checklist

- Existe limite de concorrência?
- A operação pode ser cancelada?
- Falhas parciais são preservadas?
- O payload foi validado?
- Retry é idempotente?

