# Angular Learning Lab

Laboratório acadêmico do DevForge para estudar Angular moderno com teoria, demonstrações executáveis, exercícios, avaliações e evidências de progresso.

O objetivo é aprender Angular. O lab não simula um produto comercial nem depende de um domínio de negócio específico.

## Experiência de estudo

| Rota | Área | Entrega |
|---|---|---|
| `/overview` | Visão geral | Progresso, próximo passo, desempenho e lacunas. |
| `/learning` | Trilha Angular | Cinco módulos progressivos e critérios de evidência. |
| `/documentation` | Documentação | Oito capítulos Markdown renderizados dentro do app. |
| `/components` | Componentes | Receitas interativas executadas por componentes reais. |
| `/examples` | Playground | Exercícios editáveis e executáveis no navegador. |
| `/assessments` | Avaliações | Questões por tema, correção e corte de 80%. |
| `/reports` | Meu progresso | Lacunas, histórico e evidências de domínio. |

## Conteúdo

- fundamentos, bootstrap e tooling;
- standalone components, templates e control flow;
- Signals, `computed`, RxJS e ownership de estado;
- injeção de dependência, Router e HttpClient;
- Reactive Forms tipados;
- Angular Material e acessibilidade;
- performance com `OnPush`;
- testes e arquitetura de features.

## Como o aprendizado funciona

1. Leia o capítulo relacionado na documentação interna.
2. Observe a receita no catálogo de componentes.
3. Resolva o exercício no playground.
4. Faça a avaliação do tema.
5. Consulte o relatório e registre evidência na skill somente quando conseguir explicar e implementar.

Concluir um item na interface não altera automaticamente o nível da skill. O progresso local organiza o estudo; a escala de domínio do DevForge exige evidência verificável.

## Decisões técnicas

- Angular standalone e TypeScript strict.
- Rotas de feature carregadas sob demanda.
- `ChangeDetectionStrategy.OnPush` nos componentes.
- Angular Material como base da interface.
- Signals para estado local e derivado; RxJS para fluxos assíncronos.
- `ngx-markdown` para servir a documentação real de `docs/`.
- Progresso persistido em `localStorage`.
- Índices leves separados dos bancos de conteúdo para evitar inflar o bundle inicial.

## Estrutura

```text
src/app/
├── core/
│   ├── queue/                  # estrutura genérica para estudo
│   └── services/               # progresso e tema
├── features/
│   ├── overview/               # dashboard acadêmico
│   ├── learning/               # trilha e módulos
│   ├── documentation/          # leitor dos arquivos Markdown
│   ├── component-catalog/      # receitas e demos reais
│   ├── examples/               # playground executável
│   ├── assessments/            # provas e banco de questões
│   └── reports/                # lacunas e evidências
└── shared/layout/              # header e sidebar
docs/                           # handbook, trilha e exercícios
```

## Executar

Na raiz do DevForge:

```bash
npm install
npm run dev:angular
npm run build:angular
npm run test:angular
```

Ou dentro deste diretório:

```bash
npm install
npm start
npm test -- --watch=false --browsers=ChromeHeadless
npm run build
```

Conteúdo permanente da tecnologia: [`skills/frontend/angular`](../../skills/frontend/angular/README.md).
