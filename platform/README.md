# DevForge Platform

A plataforma real do DevForge — não é um lab de prática (isso é `labs/`), é a "Udemy pessoal" que navega o conteúdo real do repositório: skills, vagas, challenges, labs e planos de estudo.

## Como funciona

Não há duplicação de conteúdo. Os arquivos `.md` de `skills/`, `vacancies/`, `challenges/` e `study-plans/` (na raiz do DevForge) são copiados como assets no build (`angular.json`) para `content/...` e renderizados em runtime com [`ngx-markdown`](https://www.npmjs.com/package/ngx-markdown) via `<markdown [src]="...">`. Editar um `.md` no repositório e rodar `ng serve`/`ng build` de novo já reflete a mudança — não existe um segundo lugar para manter sincronizado.

Um índice leve em `src/app/core/data/content-index.ts` mapeia slug → categoria → caminho do arquivo, porque o browser não consegue listar diretórios sozinho. Esse índice guarda só metadados de navegação (título, categoria, caminho) — o conteúdo em si sempre vem do `.md` real.

## UI

Angular Material (tema `azure-blue`, alinhado ao `labs/angular` para consistência visual entre a plataforma e a Angular Academy).

- `MatToolbar` + `MatSidenav`/`MatNavList` — shell com navegação por Dashboard, Progresso, Jornada, Trilhas, Insights, Skills, Challenges, Labs, Planos e Vagas. Sidebar colapsável e responsiva.
- `MatCard` em grid — catálogo estilo curso (Skills, Challenges, Planos de estudo), com busca (`MatFormField`/`MatInput`) e filtro por categoria (`MatChipListbox`) em Skills e Challenges.
- Dashboard com dados derivados do conteúdo real e estados explícitos de “não avaliado”; não inventa nível, XP, horas ou gaps.
- Catálogo de Labs com stack, status, skills exercitadas, vaga relacionada e README real.
- `MatTabGroup` — página de vaga, alternando entre Visão geral / Requisitos / Preparação.
- `ngx-markdown` — renderização do conteúdo real, com `MatProgressBar` indeterminado enquanto o `.md` carrega (eventos `(ready)`/`(error)` do `<markdown>`) e CSS global em `src/styles.scss` para tabelas, blocos de código e citações.

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
│   ├── progress/ + journey/ + tracks/ + insights/
│   ├── skills/skills-catalog/ + skill-detail/
│   ├── vacancies/vacancy-list/ + vacancy-detail/
│   ├── challenges/challenge-catalog/ + challenge-detail/
│   ├── labs/lab-catalog/ + lab-detail/
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
- [x] catálogo e detalhe de Labs
- [x] níveis não avaliados tratados sem métricas demonstrativas
- [ ] cadastro de vaga pela UI (hoje só leitura — cadastro ainda é via `devforge-new-vacancy`)
- [ ] matriz vaga × skill com nível atual/gap calculado (os campos existem, mas os níveis aguardam evidência)
- [ ] dashboard de gaps
- [ ] indicador de nível de domínio nos cards de skill (0-6), quando os `.md` passarem a ter essa seção
