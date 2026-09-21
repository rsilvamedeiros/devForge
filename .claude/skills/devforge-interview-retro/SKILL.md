---
name: devforge-interview-retro
description: Registra a retrospectiva de uma entrevista realizada, a partir do template docs/templates/INTERVIEW.md, e propaga os gaps identificados para as skills e para a vaga correspondente. Use quando o usuário disser "tive entrevista hoje", "fiz a etapa técnica da vaga X", "quero registrar como foi a entrevista".
---

# devforge-interview-retro

Implementa `interviews/README.md` §"Após cada entrevista" e o §7 de `docs/DEVFORGE.md` (entrevista como fonte de dados: transformar erros em backlog de estudo).

Fazer isso **no mesmo dia**, enquanto os detalhes estão frescos — se o usuário estiver relatando de memória dias depois, seguir mesmo assim, mas registrar a limitação.

## Passos

1. **Identificar a vaga** correspondente em `vacancies/`.

2. **Coletar da conversa com o usuário** (perguntar o que faltar, não inventar):
   - data, etapa, entrevistadores, formato;
   - perguntas técnicas exatas (não resumidas — a pergunta literal, se o usuário lembrar);
   - o que caiu de live coding, com enunciado real;
   - perguntas de arquitetura/system design;
   - perguntas comportamentais/cultura;
   - onde foi bem, onde travou;
   - resultado (se já souber).

3. **Criar `interviews/<slug-vaga>-<etapa>.md`** a partir de `docs/templates/INTERVIEW.md`, preenchendo todas as seções.

4. **Para cada dificuldade relatada, identificar a skill relacionada** e registrar em "Gaps" do arquivo de entrevista qual skill/tópico foi exposto. Usar o formato do exemplo em `docs/DEVFORGE.md` §7:
   ```yaml
   question: "..."
   skill: <slug>
   result: partial | fail | ok
   gap: <descrição curta do gap>
   action: <ação de estudo concreta>
   ```

5. **Propagar os gaps para as skills afetadas:**
   - Em `skills/<categoria>/<slug>/README.md`, adicionar em "Gaps conhecidos" o gap identificado (não sobrescrever o que já existe lá, só complementar).
   - Não reduzir `Nível atual` automaticamente — perguntar ao usuário se a entrevista revelou que o nível estava superestimado; só ajustar com a confirmação dele.

6. **Atualizar o `README.md` da vaga** — seção "Perguntas reais" (perguntas que efetivamente caíram) e "Retrospectiva" (O que foi bem / O que faltou / Novos gaps / Ações), e "Resultado" se já souber.

7. **Transformar cada gap novo em ação concreta** — não deixar "estudar mais RxJS" solto; sugerir um exercício via `devforge-new-challenge` ou um bloco de estudo via `devforge-study-plan` quando fizer sentido.

8. **Atualizar `MANIFEST.md`** com o novo arquivo de entrevista.
