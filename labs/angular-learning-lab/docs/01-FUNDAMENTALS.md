# Angular — fundamentos e plataforma

## Modelo mental

Angular é uma plataforma opinativa: componentes descrevem UI; DI resolve dependências; Router organiza navegação; forms modelam entrada; HttpClient integra APIs; Signals e RxJS representam mudança ao longo do tempo.

## Bootstrap moderno

Aplicações standalone iniciam com `bootstrapApplication` e um `ApplicationConfig`. Providers globais devem representar infraestrutura, não estado de toda feature por conveniência.

```ts
bootstrapApplication(App, {
  providers: [provideRouter(routes), provideHttpClient(withInterceptors([authInterceptor]))],
});
```

## Estrutura

- `core`: infraestrutura singleton e contratos transversais;
- `features`: casos de uso e páginas;
- `shared`: UI realmente reutilizável;
- domínio: tipos e regras sem dependência desnecessária do framework.

Organize por feature antes de organizar por tipo. Um diretório global de components/services cresce sem indicar ownership.

## Compilação e ambiente

Conheça `angular.json`, `tsconfig`, configurations, file replacements, assets e budgets. Segredos nunca devem entrar no bundle: variáveis de build entregues ao browser são públicas.

## Renderização

Angular cria views, avalia bindings e atualiza o DOM quando dependências mudam. Signals permitem rastreamento fino. `OnPush` reduz verificações amplas, mas não substitui modelagem correta.

## Checklist

- explicar bootstrap e árvore de providers;
- localizar o limite entre feature, shared e core;
- saber o que vai para o bundle;
- distinguir build, runtime e servidor.
