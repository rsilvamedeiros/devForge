# Exercícios — Angular Learning Lab

## 1. Catálogo pesquisável

Implemente busca, filtro por categoria e ordenação sobre uma lista de aulas.

**Critérios:** Signals como fonte, `computed` para derivação, estado vazio, `@for` com `track` estável e testes da regra.

## 2. Formulário de matrícula

Crie um Reactive Form tipado para nome, e-mail e trilha escolhida.

**Critérios:** controles non-nullable, validadores, mensagens específicas, submit protegido e teste dos limites.

## 3. Stream de atividade

Consuma uma fonte periódica de eventos e apresente o último evento, o total e o status da conexão.

**Critérios:** operadores RxJS adequados, tratamento de erro, cleanup automático e fronteira clara ao converter para Signal.

## 4. Estado entre features

Compartilhe progresso entre trilha, dashboard e relatório sem duplicar dados.

**Critérios:** serviço com responsabilidade delimitada, valores derivados, persistência isolada e testes.

## 5. Rota de detalhe

Crie uma rota parametrizada para um capítulo e carregue o conteúdo correspondente.

**Critérios:** parâmetro validado, fallback de rota, loading/erro e navegação por teclado.

## 6. Auditoria de qualidade

Revise uma feature quanto a acessibilidade, performance e testabilidade.

**Critérios:** `OnPush`, identidade estável em listas, foco visível, labels, testes relevantes e decisões documentadas.

## Registro de evidência

Para cada exercício, registre:

- decisão principal;
- dificuldade encontrada;
- testes executados;
- explicação dos trade-offs;
- o que conseguiria reconstruir sem consulta.
