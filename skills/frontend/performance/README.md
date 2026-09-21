# Frontend Performance

## Angular
- identidade estável em listas;
- `track`;
- OnPush;
- evitar recomputação desnecessária;
- lazy loading;
- estado derivado;
- reduzir subscriptions;
- virtualização para listas enormes quando aplicável.

## Algoritmos
Performance de UI também começa na escolha da estrutura:
- `find` repetido em Array pode virar gargalo;
- Map pode indexar por id/ticker;
- evitar pipelines redundantes em coleções enormes sem necessidade.

Sempre medir antes de otimizar produção, mas saber analisar custo em entrevista.
