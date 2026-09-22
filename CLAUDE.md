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
| `labs/` | projetos práticos de integração |
| `interviews/` | retrospectivas reais |
| `study-plans/` | planos intensivos ou por vaga |
| `resources/` | referências externas |

Categorias de skill atuais: `computer-science`, `frontend`, `software-engineering` (ver [`docs/architecture/INFORMATION-ARCHITECTURE.md`](docs/architecture/INFORMATION-ARCHITECTURE.md) para a taxonomia completa, que também prevê `backend`, `infrastructure`, `databases`, `testing`, `security`).

## Regras não negociáveis

1. **Sempre usar os templates existentes** em `docs/templates/` (`VACANCY.md`, `SKILL.md`, `CHALLENGE.md`, `INTERVIEW.md`) ao criar vacancy, skill, challenge ou interview novos. Não inventar uma estrutura alternativa.
2. **Nível de skill nunca sobe sem evidência.** Evidência = exercício resolvido, implementação sem consulta, explicação oral, aplicação em projeto, ou desempenho em entrevista/simulação (checklist em [`docs/guides/STUDY-METHODOLOGY.md`](docs/guides/STUDY-METHODOLOGY.md)). Ao atualizar `Nível atual` de uma skill, registre a evidência em "Evidências de domínio".
3. **Antes de criar uma skill nova, procurar se já existe** em `skills/` (mesmo em outra categoria). Vaga referencia skill existente; não duplicar (`CONTRIBUTING.md`).
4. **Preservar conteúdo de estudo.** Nunca apagar ou reescrever material de vacancy/skill/challenge/interview já preenchido — apenas complementar, a menos que o usuário peça explicitamente para remover.
5. **Evitar overengineering.** Este repo não é uma aplicação (ainda) — v0.3/v1 do [`ROADMAP.md`](ROADMAP.md) preveem uma app real. Até lá, não criar scripts, build systems ou automações fora do escopo pedido. A única exceção é o laboratório em `labs/angular-digital-equities`.
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

Convenções específicas para `labs/angular-digital-equities` (de `docs/guides/CLAUDE-CODE-HANDOFF.md`):
- Angular moderno + TypeScript strict.
- Código didático, mas próximo de produção; evitar abstrações prematuras.
- Cada feature deve declarar quais skills exercita (comentário curto ou seção no README do lab).
- Testes onde agregarem ao aprendizado, não por obrigação.
- UI usa **Angular Material** (`ng add @angular/material` já feito, tema `azure-blue`) — evoluir uma tela significa trocar HTML cru por componentes Material (`MatFormField`, `MatTable`, `MatButton`, etc.), não escrever CSS do zero.

## Cada lab é autocontido — sem package.json na raiz do repo

Não criar um `package.json`/npm workspace na raiz do DevForge para orquestrar os labs, mesmo que isso pareça conveniente. Cada lab em `labs/` carrega seu próprio tooling (`package.json`, `requirements.txt`, etc.) e roda de dentro da própria pasta (`cd labs/<nome> && npm start`, por exemplo). Motivo: este repo é propositalmente poliglota — `docs/architecture/INFORMATION-ARCHITECTURE.md` já prevê categorias como `backend`, `infrastructure`, `databases`, e vagas futuras podem exigir labs em Python, Java, Go etc. Um `package.json` na raiz sinalizaria "isto é um projeto npm" e não escala para isso. Reavaliar só quando existirem 2+ labs em Node/TS que genuinamente se beneficiem de tooling compartilhado (ex.: config de lint/tsconfig comum) — e mesmo assim, workspaces (não um app único), nunca um build compartilhado entre labs.
