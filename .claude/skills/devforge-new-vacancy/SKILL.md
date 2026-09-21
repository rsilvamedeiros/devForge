---
name: devforge-new-vacancy
description: Cadastra uma vaga nova no DevForge a partir de uma descrição de vaga colada pelo usuário (empresa, cargo, requisitos, informações do processo). Use quando o usuário disser algo como "colei uma vaga nova", "tenho um processo em X", "cria a pasta dessa vaga" ou compartilhar o texto de uma JD.
---

# devforge-new-vacancy

Cadastra uma vaga seguindo o modelo em `docs/DEVFORGE.md` (Vaga → Requisitos → Skills → Gaps).

## Passos

1. **Coletar a descrição.** Se o usuário só disse "tenho uma vaga nova" sem colar o texto, peça a descrição completa (empresa, cargo, requisitos, diferenciais, qualquer informação informal recebida no processo — recrutador, outro dev, etc.). Não invente requisitos que não foram informados.

2. **Definir o slug da pasta.** `vacancies/<empresa-cargo-curto>/` em kebab-case (ex.: `vacancies/btg-digital-equities/`, seguindo o padrão existente). Confirmar que a pasta ainda não existe.

3. **Criar os 3 arquivos a partir dos templates:**
   - `README.md` a partir de `docs/templates/VACANCY.md` — preencher Descrição, Requisitos obrigatórios, Requisitos valorizados, Diferenciais, Informações recebidas durante o processo, Formato da entrevista, Etapas. Deixar "Perguntas prováveis", "Perguntas reais", "Resultado" e "Retrospectiva" vazios (preenchidos depois, pelas skills `devforge-interview-retro`).
   - `REQUIREMENTS.md` — matriz de requisitos no formato usado em `vacancies/btg-digital-equities/REQUIREMENTS.md`: tabela `Skill | Origem | Prioridade`. Origem = de onde veio o requisito (vaga, recrutadora, relato dev, ecossistema, diferencial). Prioridade = máxima/alta/média. Informação direta do processo tem precedência sobre relatos informais — não inflar prioridade com base em achismo.
   - `INTERVIEW-PREP.md` (opcional, só se fizer sentido ter notas de preparação separadas do README) — livre, mas segue o tom direto do repo.

4. **Mapear requisitos → skills existentes.** Para cada requisito, procurar em `skills/` (todas as categorias) uma skill correspondente. Se existir, referenciar pelo slug (nome da pasta). Se não existir:
   - Perguntar ao usuário se deve criar a skill agora ou só deixar registrada como gap.
   - Se criar, use o template `docs/templates/SKILL.md` na categoria mais apropriada (`computer-science`, `frontend`, `software-engineering`, ou uma nova categoria coerente com a taxonomia em `docs/architecture/INFORMATION-ARCHITECTURE.md`), com `Nível atual` e `Nível alvo` em `0/6`.

5. **Preencher a tabela "Skills relacionadas"** no README da vaga (`Skill | Importância | Nível alvo | Nível atual | Gap`):
   - Importância: `required` (obrigatório), `valued` (valorizado), `differential` (diferencial), `interview-focus` (citado explicitamente como foco da etapa técnica).
   - Nível atual: ler de `skills/<categoria>/<slug>/README.md` → "Nível atual".
   - Nível alvo: inferir da importância (required/interview-focus → geralmente 4-5, valued → 3-4, differential → 2-3), mas perguntar ao usuário se a inferência for incerta.
   - Gap: diferença entre alvo e atual.

6. **Criar `vacancies/<slug>/vacancy.example.json`-like data é opcional** — só gerar um JSON estruturado (formato de `docs/templates/vacancy.example.json`) se o usuário pedir explicitamente ou se for útil para uma automação futura.

7. **Atualizar `MANIFEST.md`** com as novas entradas (ordem alfabética dentro da seção de `vacancies/`).

8. **Sugerir o próximo passo:** rodar `devforge-gap-analysis` para consolidar os gaps e depois `devforge-study-plan` para gerar o plano.

## O que não fazer

- Não estimar `Nível atual` de uma skill sem checar o README real da skill.
- Não criar retrospectiva, perguntas reais ou resultado — isso só existe depois da entrevista.
- Não misturar a criação da vaga com criação de challenges ou labs no mesmo commit.
