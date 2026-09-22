# DevForge Platform

A plataforma real do DevForge — não é um lab de prática (isso é `labs/`), é a "Udemy pessoal" que navega o conteúdo real do repositório: skills, vagas, challenges e planos de estudo.

## Como funciona

Não há duplicação de conteúdo. Os arquivos `.md` de `skills/`, `vacancies/`, `challenges/` e `study-plans/` (na raiz do DevForge) são copiados como assets no build (`angular.json`) para `content/...` e renderizados em runtime com [`ngx-markdown`](https://www.npmjs.com/package/ngx-markdown) via `<markdown [src]="...">`. Editar um `.md` no repositório e rodar `ng serve`/`ng build` de novo já reflete a mudança — não existe um segundo lugar para manter sincronizado.

Um índice leve em `src/app/core/data/content-index.ts` mapeia slug → categoria → caminho do arquivo, porque o browser não consegue listar diretórios sozinho. Esse índice guarda só metadados de navegação (título, categoria, caminho) — o conteúdo em si sempre vem do `.md` real.

## UI

Angular Material (tema `azure-blue`, mesma paleta do `labs/angular-digital-equities` para consistência visual entre os dois projetos Angular do repo).

- `MatToolbar` + `MatSidenav`/`MatNavList` — shell com navegação por seção (Dashboard, Skills, Vagas, Challenges, Planos de estudo).
- `MatCard` em grid — catálogo estilo curso (Skills, Challenges, Planos de estudo).
- `MatTabGroup` — página de vaga, alternando entre Visão geral / Requisitos / Preparação.
- `ngx-markdown` — renderização do conteúdo real, com CSS global em `src/styles.scss` para tabelas, blocos de código e citações dentro do `<markdown>`.

## Estrutura

```text
src/app/
├── app.ts / app.html / app.scss   # shell: header + sidebar + <router-outlet>
├── app.routes.ts
├── app.config.ts                  # inclui provideMarkdown() e provideHttpClient()
├── core/
│   ├── models/content.model.ts
│   └── data/content-index.ts      # índice slug → categoria → caminho do .md real
├── features/
│   ├── dashboard/
│   ├── skills/skills-catalog/ + skill-detail/
│   ├── vacancies/vacancy-list/ + vacancy-detail/
│   ├── challenges/challenge-catalog/ + challenge-detail/
│   └── study-plans/study-plan-list/ + study-plan-detail/
└── shared/layout/
    ├── header/
    └── sidebar/
```

## Rodando o projeto

```bash
npm install
ng serve      # http://localhost:4200
ng test       # Karma/Jasmine
ng build      # dist/ — copia os .md reais para dist/.../content/
```

## Roadmap

Isto implementa o item "v0.3 — aplicação local" do `ROADMAP.md` da raiz do DevForge.

- [x] shell (header + sidebar) estilo plataforma de estudos
- [x] Dashboard com contagem real de skills/vagas/challenges/planos
- [x] catálogo de Skills lendo o `.md` real por categoria
- [x] catálogo de Challenges lendo o `.md` real
- [x] lista de Vagas + detalhe com abas (Visão geral / Requisitos / Preparação)
- [x] lista de Planos de estudo + detalhe
- [ ] cadastro de vaga pela UI (hoje só leitura — cadastro ainda é via `devforge-new-vacancy`)
- [ ] matriz vaga × skill com nível atual/gap calculado (hoje os arquivos de skill não têm "Nível atual" estruturado — depende disso existir primeiro)
- [ ] dashboard de gaps
- [ ] indicador de nível de domínio nos cards de skill (0-6), quando os `.md` passarem a ter essa seção
