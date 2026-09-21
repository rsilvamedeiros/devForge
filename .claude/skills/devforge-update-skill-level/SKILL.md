---
name: devforge-update-skill-level
description: Atualiza o nível de domínio (0-6) de uma skill em skills/, exigindo evidência concreta conforme o checklist de docs/guides/STUDY-METHODOLOGY.md. Use quando o usuário disser "subi de nível em X", "consegui implementar Y sem consultar", "quero registrar evidência para a skill Z".
---

# devforge-update-skill-level

Aplica a regra do repo: **nível de skill não sobe sem evidência** (`CONTRIBUTING.md`, `docs/guides/STUDY-METHODOLOGY.md`).

## Passos

1. **Localizar a skill** em `skills/<categoria>/<slug>/README.md`. Se não existir, perguntar se deve ser criada agora (via template `docs/templates/SKILL.md`) antes de registrar evidência.

2. **Perguntar/confirmar qual evidência sustenta a subida de nível**, mapeando para o checklist de `docs/guides/STUDY-METHODOLOGY.md`:
   - [ ] expliquei sem consultar;
   - [ ] implementei sem consultar;
   - [ ] resolvi exercício;
   - [ ] expliquei Big O/trade-offs;
   - [ ] apliquei em projeto;
   - [ ] respondi em simulação/entrevista.

   Não aceitar "estudei o assunto" como evidência suficiente — precisa ser uma ação verificável e específica (qual exercício, qual explicação, qual projeto/entrevista).

3. **Determinar o novo nível** usando a escala de `docs/DEVFORGE.md` §5 (0 a 6). Nunca pular mais de 1-2 níveis de uma vez sem evidência forte cobrindo os intermediários — sinalizar ao usuário se o salto parecer grande demais para a evidência apresentada.

4. **Atualizar o `README.md` da skill:**
   - `Nível atual` — novo valor.
   - `Evidências de domínio` — adicionar uma linha nova (não substituir o histórico) descrevendo data (se souber), o que foi feito, e qual item do checklist foi cumprido.
   - Se a evidência veio de um challenge ou entrevista específica, linkar o arquivo correspondente (`challenges/...` ou `interviews/...`).

5. **Verificar se essa skill está referenciada em alguma vaga ativa** (`vacancies/*/README.md`, tabela "Skills relacionadas") — se sim, sugerir rodar `devforge-gap-analysis` para atualizar o gap daquela vaga com o novo nível.

6. **Nunca editar `Nível alvo`** nesta skill — alvo é definido pela vaga/objetivo do usuário, não por evidência de estudo.
