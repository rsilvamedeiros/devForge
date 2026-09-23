# Libraries, workspaces e design systems

Uma library Angular estabelece um contrato reutilizável. Ela deve existir quando há múltiplos consumidores ou uma fronteira estável — não apenas para mover arquivos.

## Criando uma library

```bash
ng generate library learning-ui
ng build learning-ui
ng test learning-ui
```

O build usa Angular Package Format e `ng-packagr`. Exporte somente a API suportada pelo `public-api.ts`; deep imports acoplam consumidores à organização interna.

```ts
// public-api.ts
export { CourseCard } from './lib/course-card/course-card';
export type { CourseCardData } from './lib/course-card/course-card.types';
export { provideLearningTheme } from './lib/theme/theme.provider';
```

## Categorias úteis

- UI/design system: componentes visuais e tokens.
- Domain: tipos e regras estáveis sem infraestrutura.
- Data access: clients, adapters e persistência.
- Feature: fluxo completo, com maior acoplamento.
- Utility: funções puras e pequenas.

## Providers e configuração

Prefira funções `provideX()` tipadas. Tokens aceitam implementações diferentes sem condicionar a library ao ambiente.

```ts
export const COURSE_API_URL = new InjectionToken<string>('COURSE_API_URL');

export function provideCourses(config: { apiUrl: string }): EnvironmentProviders {
  return makeEnvironmentProviders([
    CourseClient,
    { provide: COURSE_API_URL, useValue: config.apiUrl }
  ]);
}
```

## Design system

Defina tokens de cor, spacing, radius, typography, motion e elevation antes de criar componentes. Cada componente documenta estados, acessibilidade, densidade, responsividade e exemplos. Storybook complementa o laboratório, mas não substitui testes.

## Monorepo

Um workspace com múltiplas aplicações facilita compartilhamento e mudanças atômicas, mas aumenta custo de CI e governança. Nx adiciona project graph, affected commands, boundaries e cache. Use tags e regras de dependência para proteger as fronteiras.

## Versionamento e extração

Libraries publicadas precisam de semver, changelog, migrations e política de depreciação. Extraia quando há reuso comprovado, contrato compreendido, ownership definido e benefício maior que a coordenação. Duplicação pequena pode ser mais barata que abstração prematura.
