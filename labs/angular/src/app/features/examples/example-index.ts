/**
 * Índice leve dos exemplos, pelo mesmo motivo do `exam-index.ts`: a sidebar só
 * precisa contar, e `code-examples.ts` carrega todo o código-fonte editável.
 */
export const EXAMPLE_INDEX: { id: string; title: string }[] = [
  { id: 'filter-map', title: 'Filtrar e projetar uma lista' },
  { id: 'group-by', title: 'Agrupar por setor' },
  { id: 'immutable-update', title: 'Atualização imutável' },
  { id: 'dedupe-cost', title: 'Duplicatas: O(n²) vs O(n)' },
  { id: 'derived-metrics', title: 'Métricas derivadas do estado' },
];
