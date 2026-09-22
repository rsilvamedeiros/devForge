# Padrão de laboratório completo

Um lab do DevForge não é uma demo de framework. É uma experiência executável que conecta teoria, prática guiada, produto e evidência de domínio.

## Anatomia obrigatória

Todo lab deve ter:

1. **Produto** — domínio, usuário e problema reais o suficiente para justificar as decisões.
2. **Experiência visual** — identidade própria, responsividade, acessibilidade e estados de interface.
3. **Trilha** — módulos em ordem, com objetivo, entrega e conceito principal.
4. **Documentação** — handbook por tecnologia, capítulos temáticos, links para as skills permanentes e decisões específicas do projeto.
5. **Exercícios** — desafios básico, intermediário e avançado ligados ao código real.
6. **Qualidade** — TypeScript strict quando aplicável, testes relevantes e build reproduzível.
7. **Evidência** — checklist do que precisa ser implementado e explicado sem consulta.

## Níveis de exercício

- **Fundamento:** alteração pequena para confirmar sintaxe e modelo mental.
- **Aplicação:** feature completa combinando mais de um conceito.
- **Arquitetura:** decisão aberta, com trade-offs, testes e justificativa.

## Critério de conclusão

Um lab só pode ser marcado como concluído quando:

- todos os módulos obrigatórios estiverem implementados;
- os exercícios tiverem solução e retrospectiva registradas;
- build e testes passarem;
- a pessoa conseguir demonstrar o fluxo e explicar as decisões;
- as evidências forem registradas nas skills relacionadas.

## Padrão do handbook

O diretório `docs/` do lab deve conter um `HANDBOOK.md` e capítulos que cubram:

- fundamentos e modelo mental;
- APIs e recursos principais;
- estado, dados e integração;
- arquitetura e trade-offs;
- testes, performance, acessibilidade e segurança;
- perguntas de entrevista, erros comuns e aplicação no lab.

A skill central mantém o mapa de competência e aponta para o handbook. A documentação do lab aprofunda e demonstra o conteúdo no domínio do projeto.

Progresso visual no lab representa conclusão de módulos, não nível de domínio. Nível de skill continua exigindo evidência explícita.

## Evolução

Novas tecnologias só entram depois que os labs ativos estiverem consistentes com este padrão. O objetivo é profundidade comprovável, não quantidade de projetos.
