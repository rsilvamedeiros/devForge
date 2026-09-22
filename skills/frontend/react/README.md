# React

## Objetivo

Construir interfaces componentizadas, acessíveis e previsíveis usando React moderno e TypeScript.

## Nível atual
`Não avaliado`

Nenhum nível atribuído sem evidência registrada.

## Nível alvo
`A definir por vaga`

## Fundamentos

- componentes funcionais;
- props e composição;
- estado e eventos;
- hooks;
- renderização condicional e listas;
- formulários;
- roteamento;
- estado remoto;
- acessibilidade;
- testes de comportamento.

## Quando usar

- interfaces com composição flexível;
- ecossistemas que adotam React;
- aplicações que precisam compartilhar padrões entre web e outras plataformas.

## Quando não usar

- páginas estáticas simples sem interatividade relevante;
- quando o time já possui outra stack consolidada e a troca não resolve um problema real.

## Exemplos

O lab `react-service-operations` aplica React em uma central de atendimento com tickets, SLA, filtros e atualização otimista.

## Complexidade / performance

- preservar identidade em listas com `key` estável;
- evitar estado duplicado;
- medir antes de aplicar memoização;
- separar estado local de estado remoto;
- observar custo de renderização em listas extensas.

## Trade-offs

- flexibilidade exige decisões explícitas de arquitetura;
- ecossistema amplo aumenta opções e custo de padronização;
- renderização no cliente é simples, mas pode exigir um framework para SSR e streaming.

## Exercícios

- filtrar e ordenar tickets sem mutação;
- criar formulário controlado;
- implementar atualização otimista com rollback;
- testar loading, erro, empty state e sucesso.

## Perguntas de entrevista

- estado vs props?
- controlled vs uncontrolled components?
- quando usar `useEffect`?
- por que uma `key` estável importa?
- estado local vs servidor?
- quando `useMemo` não ajuda?

## Erros comuns

- sincronizar estado derivado com `useEffect`;
- usar índice como `key` em listas mutáveis;
- buscar dados sem tratar cancelamento, erro e cache;
- memoizar tudo sem medição.

## Aplicação real

- `labs/react-service-operations`.

## Gaps conhecidos

- avaliação de domínio pendente.

## Evidências de domínio

- nenhuma evidência registrada.

## Recursos

- documentação oficial do React;
- documentação do React Router;
- documentação do TanStack Query.
