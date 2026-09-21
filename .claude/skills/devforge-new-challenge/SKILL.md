---
name: devforge-new-challenge
description: Cria um novo exercício/desafio a partir do template em docs/templates/CHALLENGE.md, na categoria certa dentro de challenges/. Use quando o usuário pedir "cria um desafio de arrays", "quero um exercício de two pointers", "adiciona um problema de system design".
---

# devforge-new-challenge

Cria um exercício reutilizável seguindo `docs/templates/CHALLENGE.md`, no formato dos existentes em `challenges/arrays/`, `challenges/oop/`, `challenges/system-design/`, `challenges/live-coding/`.

## Passos

1. **Determinar a categoria** (`arrays`, `oop`, `system-design`, `live-coding`, ou nova categoria coerente — perguntar se não for óbvio) e o número sequencial dentro dela (`0N-nome-descritivo.md`, seguindo o padrão `01-frequency-counter.md`, `02-two-sum.md`).

2. **Preencher todas as seções do template**, sem pular nenhuma:
   - `Skills` — slugs das skills exercitadas (ex.: `arrays-lists`, `algorithms-big-o`), cruzando com `skills/` existente.
   - `Dificuldade` — Easy/Medium/Hard.
   - `Enunciado`, `Entrada`, `Saída`, `Exemplos`, `Restrições`, `Edge cases` — completos e concretos, não genéricos.
   - `Solução inicial` — a solução ingênua/força bruta, em TypeScript por padrão (ou a linguagem que o usuário estiver usando no momento), com comentário mínimo.
   - `Time Complexity` / `Space Complexity` da solução inicial.
   - `Problemas da solução` — por que a solução ingênua não é ideal.
   - `Solução otimizada` — com complexidade melhor, explicando a troca feita (ex.: espaço por tempo via hash map).
   - `Trade-offs` — comparação honesta entre as duas soluções.
   - `Mudanças de requisito` — 1-2 variações que um entrevistador poderia pedir em seguida (ex.: "e se a lista for infinita/streaming?").
   - `O que o entrevistador pode perguntar` — perguntas realistas de acompanhamento.
   - `Retrospectiva` — deixar vazio; é preenchido pelo usuário depois de resolver.

3. **Não resolver o desafio "fácil demais"** — a solução inicial deve ser genuinamente a abordagem ingênua, não já otimizada, para que o desafio ensine a progressão.

4. **Vincular ao plano/vaga se houver contexto** — se o pedido veio de dentro de um `devforge-study-plan` ou de uma vaga específica, mencionar isso e considerar linkar o challenge na seção correspondente do plano.

5. **Atualizar `MANIFEST.md`** com o novo arquivo.

6. **Perguntar se o usuário quer resolver agora** ("sem IA primeiro", conforme `README.md` — "Implemente os desafios sem IA primeiro; use IA depois para revisão e alternativas") ou só deixar cadastrado para depois.
