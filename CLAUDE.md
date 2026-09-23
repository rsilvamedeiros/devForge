# DevForge — guia para o Claude Code

DevForge é um workspace **pessoal de estudo**, não um produto de software. É uma base de conhecimento em Markdown que transforma vagas e entrevistas reais em um ciclo contínuo de preparação técnica. Veja a visão completa em [`docs/DEVFORGE.md`](docs/DEVFORGE.md) e o handoff original em [`docs/guides/CLAUDE-CODE-HANDOFF.md`](docs/guides/CLAUDE-CODE-HANDOFF.md).

## O ciclo

```text
Vaga → Requisitos → Skills → Gaps → Plano de estudos → Prática → Entrevista → Feedback → Evolução
```

A vaga referencia skills; a skill não pertence à vaga. Conhecimento é permanente e reaproveitado entre processos.

## Estrutura

| Pasta | Conteúdo |
|---|---|
| `docs/` | visão, arquitetura, metodologia, templates |
| `vacancies/` | um processo seletivo por subpasta |
| `skills/<categoria>/<skill>/README.md` | conhecimento permanente por skill |
| `challenges/<categoria>/` | exercícios e live coding |
| `labs/` | ambientes acadêmicos completos, um por tecnologia principal |
| `platform/` | a app real do DevForge (v0.3 do roadmap) — lê o conteúdo real de `skills/`, `vacancies/`, `challenges/`, `study-plans/`, não é um exercício |
| `interviews/` | retrospectivas reais |
| `study-plans/` | planos intensivos ou por vaga |
| `resources/` | referências externas |

**`labs/` vs. `platform/`:** um lab ensina e exercita uma tecnologia em profundidade, com teoria, demos, exercícios, avaliações e evidências. `platform/` é a plataforma geral do DevForge, que navega o conteúdo real do repositório. Não confundir os dois nem misturar código de um no outro.

Categorias de skill atuais: `computer-science`, `frontend`, `software-engineering` (ver [`docs/architecture/INFORMATION-ARCHITECTURE.md`](docs/architecture/INFORMATION-ARCHITECTURE.md) para a taxonomia completa, que também prevê `backend`, `infrastructure`, `databases`, `testing`, `security`).

## Regras não negociáveis

1. **Sempre usar os templates existentes** em `docs/templates/` (`VACANCY.md`, `SKILL.md`, `CHALLENGE.md`, `INTERVIEW.md`) ao criar vacancy, skill, challenge ou interview novos. Não inventar uma estrutura alternativa.
2. **Nível de skill nunca sobe sem evidência.** Evidência = exercício resolvido, implementação sem consulta, explicação oral, aplicação em projeto, ou desempenho em entrevista/simulação (checklist em [`docs/guides/STUDY-METHODOLOGY.md`](docs/guides/STUDY-METHODOLOGY.md)). Ao atualizar `Nível atual` de uma skill, registre a evidência em "Evidências de domínio".
3. **Antes de criar uma skill nova, procurar se já existe** em `skills/` (mesmo em outra categoria). Vaga referencia skill existente; não duplicar (`CONTRIBUTING.md`).
4. **Preservar conteúdo de estudo.** Nunca apagar ou reescrever material de vacancy/skill/challenge/interview já preenchido — apenas complementar, a menos que o usuário peça explicitamente para remover.
5. **Evitar overengineering.** Fora de `labs/` e `platform/`, este repo é conteúdo em Markdown — não criar scripts, build systems ou automações fora do escopo pedido.
6. **Idioma:** conteúdo do repositório (docs, skills, vacancies, challenges) é em **pt-BR**, no mesmo tom direto e telegráfico já usado nos arquivos existentes (frases curtas, listas, sem enrolação).
7. **Manter `MANIFEST.md` atualizado** — é a lista plana de todos os arquivos do repo. Ao criar/remover arquivo, atualizar a entrada correspondente (ordem alfabética por pasta).
8. **Commits pequenos por tópico de estudo**, conforme `docs/guides/CLAUDE-CODE-HANDOFF.md` — não misturar criação de vacancy, skill e challenge não relacionados no mesmo commit.
9. **Nunca commitar automaticamente.** O Claude Code nunca deve rodar `git commit` (nem `git add`/`git push`) por conta própria neste repositório, mesmo que o trabalho pareça concluído. O usuário sempre revisa o diff e commita manualmente. Preparar as mudanças e parar aí — só commitar se o usuário pedir explicitamente naquele momento.
10. **Mensagens de commit em inglês, no padrão Conventional Commits** (`<tipo>: <descrição>`), sempre — mesmo o conteúdo do repositório sendo pt-BR. Tipos usados neste repo: `feat` (nova vacancy/skill/challenge/lab/skill do Claude), `fix` (correção de conteúdo errado), `docs` (ajuste em docs/templates/README sem conteúdo novo), `chore` (manutenção, ex. sync do manifest). Descrição curta, no imperativo, minúscula, sem ponto final (ex.: `feat: add BTG digital equities vacancy`, `chore: sync manifest`, `docs: update study methodology`). Isso vale tanto para commits feitos pelo Claude (quando pedido) quanto como padrão a sugerir quando o usuário for commitar manualmente.
11. **Regra de prioridade em período de entrevista:** 80% estudo/prática, 20% organização/plataforma (`docs/DEVFORGE.md` §9). Se o usuário estiver em contagem regressiva para uma entrevista, priorize gerar conteúdo de estudo/exercício sobre refatorar estrutura do repo.

## Escala de domínio (usada em toda skill)

`0` nunca estudei · `1` conheço o conceito · `2` consigo explicar · `3` implemento consultando · `4` implemento sozinho · `5` justifico decisões/trade-offs · `6` aplico em arquitetura real.

## Skills do Claude Code disponíveis neste repo

Em `.claude/skills/` (não confundir com `skills/`, que é conhecimento de estudo, não automação):

- `devforge-new-vacancy` — cadastrar uma vaga nova a partir da descrição colada pelo usuário.
- `devforge-gap-analysis` — recalcular a tabela de gaps de uma vaga comparando com o nível atual das skills.
- `devforge-study-plan` — gerar um plano de estudos priorizado pelos gaps de uma vaga.
- `devforge-new-challenge` — criar um exercício novo a partir do template, na categoria certa.
- `devforge-interview-retro` — registrar retrospectiva pós-entrevista e propagar gaps novos para as skills afetadas.
- `devforge-update-skill-level` — atualizar nível de uma skill exigindo evidência.
- `devforge-sync-manifest` — regenerar `MANIFEST.md` a partir do estado real do repositório.

Use essas skills proativamente quando o pedido do usuário corresponder claramente ao fluxo (ex.: "colei uma vaga nova", "tive entrevista hoje", "atualiza o gap da vaga X", "cria um desafio de arrays").

## Laboratório Angular

Convenções específicas para `labs/angular-learning-lab` (de `docs/guides/CLAUDE-CODE-HANDOFF.md`):
- Angular moderno + TypeScript strict.
- Código didático, mas próximo de produção; evitar abstrações prematuras.
- Escopo exclusivamente acadêmico: exemplos neutros de aulas, trilhas, progresso e conteúdo; sem simular produto financeiro.
- Cada feature deve declarar quais skills exercita (comentário curto ou seção no README do lab).
- Testes onde agregarem ao aprendizado, não por obrigação.
- UI usa **Angular Material** (`ng add @angular/material` já feito, tema `azure-blue`) — evoluir uma tela significa trocar HTML cru por componentes Material (`MatFormField`, `MatTable`, `MatButton`, etc.), não escrever CSS do zero.

## Padrão dos labs

Todo lab novo ou evoluído deve seguir [`docs/guides/LAB-STANDARD.md`](docs/guides/LAB-STANDARD.md): produto com identidade visual, trilha de módulos, documentação das skills, exercícios progressivos, testes e critérios de evidência. Priorizar profundidade nos labs ativos antes de adicionar outra tecnologia. Progresso de módulo não altera automaticamente o nível de uma skill.

## Plataforma DevForge (`platform/`)

- App Angular real (não exercício) que **lê o conteúdo real** dos `.md` de `skills/`, `vacancies/`, `challenges/`, `study-plans/` via assets copiados no build (`angular.json`) + `ngx-markdown` (`<markdown [src]="...">`), renderizado em runtime. **Nunca duplicar conteúdo** transcrevendo `.md` para TypeScript — se um dado precisa ser estruturado (slug, categoria, caminho), ele entra no índice leve em `core/data/content-index.ts`, nunca o conteúdo em si.
- Ao criar/mover/renomear uma vacancy, skill, challenge ou study-plan, **atualizar `content-index.ts`** no `platform/` (slug, título, categoria, caminho) — senão o item não aparece na plataforma.
- Mesma stack visual do lab Angular: Angular Material, tema `azure-blue`, `ChangeDetectionStrategy.OnPush`.
- Roadmap restante (matriz vaga×skill, dashboard de gaps, cadastro pela UI) depende de skills reais terem `Nível atual` estruturado — hoje a maioria não tem (ver regra 2). Adicionar isso aos `.md` de skill é pré-requisito antes de expandir a plataforma nessa direção.

## Workspace npm e projetos autocontidos

O `package.json` da raiz é somente um orquestrador para os projetos Node/TypeScript existentes. Use seus scripts para executar, testar e gerar builds sem trocar de pasta. Cada projeto mantém o próprio `package.json`, dependências e build; não compartilhar código ou configuração por conveniência. O repositório continua poliglota: futuros labs em Python, Java, Go ou outras stacks devem usar seu tooling nativo e não precisam entrar no workspace npm.
