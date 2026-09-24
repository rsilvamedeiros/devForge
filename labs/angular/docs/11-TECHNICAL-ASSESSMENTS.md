# Avaliações técnicas Angular

Esta área transforma estudo em evidência. Ela complementa as provas por capítulo com avaliações próximas de entrevistas técnicas, separadas por senioridade e com feedback explicativo.

## Formatos

| Formato | Questões | Tempo | Aprovação | Objetivo |
| --- | ---: | ---: | ---: | --- |
| Provinha | 3 | 8 min | 67% | Checagem rápida antes ou depois de um bloco de estudo |
| Simulado Júnior | 6 | 20 min | 80% | Validar fundamentos e implementação guiada |
| Simulado Pleno | 6 | 25 min | 80% | Validar autonomia, integração e qualidade |
| Simulado Sênior | 6 | 30 min | 80% | Validar decisões arquiteturais e trade-offs |

O cronômetro inicia com a tentativa e a avaliação é entregue automaticamente quando o tempo termina. O laboratório preserva localmente a melhor nota de cada avaliação.

## Júnior

Espera-se que a pessoa consiga construir e explicar uma feature pequena usando componentes, templates, bindings, control flow, signals básicos, ciclo de vida e Reactive Forms.

- Reconhecer responsabilidades de componentes e serviços.
- Usar property binding e identidade estável em listas.
- Derivar estado com `computed()`.
- Aplicar validação e cleanup corretamente.

## Pleno

Espera-se autonomia para integrar dados, organizar estado e sustentar uma feature em produção.

- Compor streams e cancelar requisições obsoletas com RxJS.
- Isolar DTOs nas fronteiras de infraestrutura.
- Trabalhar com imutabilidade e `OnPush`.
- Testar HTTP e modelar filtros navegáveis no Router.

## Sênior

Espera-se capacidade de desenhar fronteiras, justificar escolhas e antecipar custos operacionais.

- Evitar fontes de verdade duplicadas e abstrações prematuras.
- Definir escopo de providers e estado por contexto.
- Escolher CSR, SSR ou prerender por requisitos mensuráveis.
- Tratar autorização no servidor e segurança como fronteira sistêmica.

## Como usar o resultado

1. Faça a provinha do nível pretendido sem consultar a documentação.
2. Revise cada explicação, inclusive nos acertos.
3. Retorne aos capítulos e exemplos relacionados aos erros.
4. Implemente um exercício prático da mesma competência.
5. Execute o simulado e busque ao menos 80%.

Uma nota isolada não determina senioridade. Use o resultado como diagnóstico e combine-o com código produzido, testes, explicação de decisões e capacidade de manter a solução.
