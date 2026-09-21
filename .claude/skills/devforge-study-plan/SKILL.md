---
name: devforge-study-plan
description: Gera um plano de estudos priorizado pelos gaps de uma vaga, no estilo intensivo e cronometrado de study-plans/BTG-2-DIAS.md. Use quando o usuário pedir "monta um plano de estudos", "tenho X dias até a entrevista", "plano intensivo para a vaga Y".
---

# devforge-study-plan

Gera `study-plans/<NOME>.md` priorizando o maior gap primeiro, sem desperdiçar tempo em fundamentos já dominados (`docs/DEVFORGE.md` §6).

## Passos

1. **Rodar (ou reaproveitar) a gap analysis** da vaga alvo primeiro — se a tabela "Skills relacionadas" da vaga estiver desatualizada, sugerir `devforge-gap-analysis` antes de continuar.

2. **Perguntar ao usuário o que falta saber para dimensionar o plano** (só o que não dá pra inferir):
   - quanto tempo disponível (horas/dias) até a entrevista ou até quando quer revisar;
   - se é plano intensivo (poucos dias, tipo `BTG-2-DIAS.md`) ou plano contínuo (semanas, mais leve).

3. **Priorizar skills pelo gap**, maior primeiro, mas sem ignorar completamente `interview-focus` mesmo com gap pequeno (foi citado explicitamente pelo processo).

4. **Estruturar em blocos de tempo** (se intensivo) seguindo o padrão de `study-plans/BTG-2-DIAS.md`:
   - cabeçalho com a regra geral (ex.: "60–70% do tempo deve envolver código, exercício, explicação ou desenho de arquitetura");
   - blocos por dia com horário (`HH:MM–HH:MM — Tópico`);
   - dentro de cada bloco: lista de subtópicos a estudar/implementar + lista de exercícios concretos (números, não vagos) quando aplicável;
   - terminar blocos de fundamentos com uma sessão de "explicação oral sem consulta" (`docs/guides/STUDY-METHODOLOGY.md`).
   - reservar um bloco final de "entrevista simulada" antes do prazo, se o tempo permitir.

5. **Cada bloco de skill deve linkar para**:
   - a skill correspondente em `skills/<categoria>/<slug>/README.md` (usar exercícios já listados lá em "Exercícios" antes de inventar novos);
   - challenges já existentes em `challenges/` relevantes ao tópico, e sugerir criar novos via `devforge-new-challenge` só onde faltar exercício prático.

6. **Não prometer subida de nível no plano** — o plano organiza tempo e prática; o nível só sobe depois, com evidência (`devforge-update-skill-level`).

7. **Salvar em** `study-plans/<slug-da-vaga-ou-tema>-<N>-DIAS.md` (ou nome que o usuário preferir) e atualizar `MANIFEST.md`.

8. **Regra de prioridade:** se o usuário estiver a poucos dias de uma entrevista real, lembrar a regra de `docs/DEVFORGE.md` §9 (80% estudo/prática, 20% organização) — não gastar o tempo dele reorganizando o repo.
