# Router e HTTP

## Router como fronteira de feature

Uma rota define entrada, carregamento e contexto de uma capacidade. Prefira `loadComponent` ou `loadChildren` para manter bundles e dependências separados.

```ts
export const routes: Routes = [{
  path: 'courses/:id',
  loadComponent: () => import('./course-detail').then(m => m.CourseDetail),
}];
```

## Parâmetros e estado

- path param identifica o recurso principal;
- query param representa filtro, ordenação ou paginação compartilhável;
- navigation state serve para informação efêmera, nunca como única fonte recuperável;
- dados indispensáveis podem ser carregados por resolver;
- dados secundários devem aparecer progressivamente.

## Guards

Guards melhoram o fluxo no cliente. Não são controle de autorização: o servidor sempre valida permissão.

Tipos recorrentes: `CanActivateFn`, `CanMatchFn` e `CanDeactivateFn`.

## HttpClient

Componentes não devem conhecer URL, DTO ou header. Um adapter HTTP traduz o contrato externo para o modelo usado pela aplicação.

```ts
list(): Observable<Course[]> {
  return this.http.get<CourseDto[]>('/api/courses').pipe(
    map(items => items.map(toCourse))
  );
}
```

## Interceptors

Use para preocupações transversais: autenticação, correlação, telemetria e política global limitada. Erros que exigem contexto da feature continuam perto do caso de uso.

## Estado de request

Modele explicitamente `idle`, `loading`, `success`, `empty` e `error`. Três booleanos independentes permitem combinações impossíveis.

## Cache e concorrência

- cache precisa de política de invalidação;
- `switchMap` cancela resultado obsoleto em buscas;
- `exhaustMap` ignora novo disparo durante operação ativa;
- `concatMap` preserva ordem;
- `mergeMap` aceita concorrência.

