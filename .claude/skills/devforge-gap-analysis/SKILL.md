---
name: devforge-gap-analysis
description: Recalcula a tabela de gaps de skills de uma vaga específica, comparando o nível exigido com o nível atual real registrado em skills/. Use quando o usuário disser "atualiza o gap da vaga X", "recalcula os gaps", "quais são meus gaps para a entrevista de amanhã" ou similar.
---

# devforge-gap-analysis

Implementa o §6 (Gap Analysis) de `docs/DEVFORGE.md`: comparar o que a vaga exige com o que o usuário realmente domina hoje, sem repetir fundamentos já dominados.

## Passos

1. **Identificar a vaga.** Se houver mais de uma em `vacancies/`, perguntar qual (ou inferir pelo contexto da conversa/entrevista mais próxima).

2. **Ler a lista de skills exigidas** em `vacancies/<slug>/REQUIREMENTS.md` e/ou na tabela "Skills relacionadas" do `README.md` da vaga.

3. **Para cada skill, ler o nível atual real** em `skills/<categoria>/<slug>/README.md` → seção "Nível atual". Não usar memória/suposição — abrir o arquivo. Se a skill não existir ainda, nível atual = `0/6`.

4. **Determinar o nível alvo** por importância, se ainda não estiver definido na tabela da vaga:
   - `required` / `interview-focus` → alvo alto (4-5), especialmente se foi citado como foco explícito da etapa técnica.
   - `valued` → alvo médio (3-4).
   - `differential` → alvo baixo-médio (2-3).

5. **Calcular o gap** (`alvo - atual`) e reescrever a tabela "Skills relacionadas" no `README.md` da vaga, ordenada por gap decrescente (maior gap primeiro — é o que precisa de mais atenção).

6. **Resumir em texto** (fora da tabela, para a resposta ao usuário) quais 3-5 skills têm o maior gap e por quê, no estilo do exemplo em `docs/DEVFORGE.md` §6:
   ```text
   RxJS         3  ← gap de 2, citado como foco da etapa técnica
   AWS          2  ← gap de 1, apenas diferencial
   ```

7. **Não alterar `Nível atual` de nenhuma skill** — isso só muda via `devforge-update-skill-level`, com evidência. Esta skill é só leitura + recálculo da comparação.

8. **Sugerir próximo passo:** se o usuário estiver sob prazo, sugerir rodar `devforge-study-plan` para os gaps identificados.
