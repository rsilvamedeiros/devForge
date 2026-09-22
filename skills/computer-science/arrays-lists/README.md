# Arrays & Lists

## Nível atual
`Não avaliado`

Nenhum nível atribuído sem evidência registrada.

## Nível alvo
`A definir por vaga`

## Objetivo

Dominar manipulação de coleções usada em frontend e live coding.

## Métodos obrigatórios

| Método | Objetivo | Muta original? | Custo típico |
|---|---|---:|---:|
| map | transformar | não | O(n) |
| filter | selecionar | não | O(n) |
| reduce | acumular | não por si só | O(n) |
| find | primeiro match | não | O(n) |
| findIndex | índice do match | não | O(n) |
| some | existe algum? | não | O(n) pior caso |
| every | todos? | não | O(n) pior caso |
| includes | contém? | não | O(n) |
| forEach | iterar/efeito | não por si só | O(n) |
| push | inserir no fim | sim | O(1) amortizado |
| pop | remover fim | sim | O(1) |
| shift | remover início | sim | O(n) |
| unshift | inserir início | sim | O(n) |
| slice | copiar/recortar | não | O(k) |
| splice | inserir/remover | sim | O(n) |
| sort | ordenar | sim | tipicamente O(n log n) |

## Perguntas

- map vs forEach?
- find vs filter?
- reduce é sempre melhor que loop?
- por que `sort()` exige cuidado com estado?
- como atualizar um item imutavelmente?
- quando trocar Array por Map?
- quando Set é melhor?

## Exercício frontend

Receber `Asset[]` do backend e:
1. remover inativos;
2. ordenar por ticker;
3. calcular valor total;
4. agrupar por setor;
5. atualizar preço de um ativo sem mutar;
6. renderizar com identidade estável.

## Gaps conhecidos
- avaliação de domínio pendente.

## Evidências de domínio
- nenhuma evidência registrada.
