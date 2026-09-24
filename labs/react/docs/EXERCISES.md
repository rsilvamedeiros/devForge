# Exercícios — React Service Operations

## 1. Filtro por responsável

**Nível:** fundamento

Adicione um filtro de responsável na página de tickets. O resultado deve ser derivado da lista já carregada e combinar com texto e status.

**Critérios:** controle acessível, opção “Todos”, zero `useEffect` para derivação e teste do filtro combinado.

## 2. Criar ticket

**Nível:** aplicação

Implemente um formulário tipado para criar tickets com assunto, cliente, prioridade e canal.

**Critérios:** validação, mutation, atualização do cache, feedback de erro e foco no primeiro campo inválido.

## 3. Filtros compartilháveis

**Nível:** aplicação

Sincronize busca, status e prioridade com query parameters. Recarregar ou compartilhar a URL deve preservar a visão.

**Critérios:** URL como fonte de verdade, valores inválidos ignorados e navegação voltar/avançar funcional.

## 4. Paginação ou virtualização

**Nível:** arquitetura

Escolha paginação server-side ou virtualização para uma fila de 10 mil tickets.

**Critérios:** justificar a escolha, criar massa de teste, medir antes/depois e documentar efeitos em cache, acessibilidade e URL.

## Retrospectiva

Para cada exercício, registre decisão, dificuldade, teste criado e o que faria diferente. Implementar sem conseguir explicar não conta como evidência completa.
