export interface CodeExample {
  id: string;
  title: string;
  category: string;
  description: string;
  icon: string;
  /** Entrada fixa passada para `solve(input)`. */
  input: unknown;
  /** Código inicial editável. Precisa definir `function solve(input)`. */
  code: string;
  /** Saída esperada da implementação de referência, para comparação. */
  expected: unknown;
  hint: string;
  angular: string;
}

const ASSETS = [
  { symbol: 'PETR4', sector: 'Energia', price: 38.42, volume: 42_500_000, active: true },
  { symbol: 'VALE3', sector: 'Mineração', price: 61.15, volume: 31_200_000, active: true },
  { symbol: 'ITUB4', sector: 'Financeiro', price: 34.87, volume: 28_900_000, active: true },
  { symbol: 'SUZB3', sector: 'Mineração', price: 52.4, volume: 5_900_000, active: false },
  { symbol: 'B3SA3', sector: 'Financeiro', price: 11.78, volume: 22_100_000, active: true },
];

export const CODE_EXAMPLES: CodeExample[] = [
  {
    id: 'filter-map',
    title: 'Filtrar e projetar uma lista',
    category: 'Arrays',
    description: 'A base de toda tabela: filtrar o que importa e projetar só os campos usados na UI.',
    icon: 'filter_alt',
    input: ASSETS,
    code: `// Retorne os ativos ativos com volume acima de 20 milhões,
// projetando apenas { symbol, price }.
function solve(assets) {
  return assets
    .filter(asset => asset.active && asset.volume > 20_000_000)
    .map(asset => ({ symbol: asset.symbol, price: asset.price }));
}`,
    expected: [
      { symbol: 'PETR4', price: 38.42 },
      { symbol: 'VALE3', price: 61.15 },
      { symbol: 'ITUB4', price: 34.87 },
      { symbol: 'B3SA3', price: 11.78 },
    ],
    hint: 'Encadear filter + map percorre a lista duas vezes. Para listas grandes, um único reduce resolve em uma passagem.',
    angular: 'No terminal isso vive dentro de um `computed()`: a lista filtrada é derivada, nunca duplicada em outro signal.',
  },
  {
    id: 'group-by',
    title: 'Agrupar por setor',
    category: 'Arrays',
    description: 'Transformar lista em índice — a operação por trás de qualquer agrupamento na tela.',
    icon: 'workspaces',
    input: ASSETS,
    code: `// Agrupe os ativos por setor: { Energia: ['PETR4'], ... }
function solve(assets) {
  return assets.reduce((groups, asset) => {
    groups[asset.sector] ??= [];
    groups[asset.sector].push(asset.symbol);
    return groups;
  }, {});
}`,
    expected: {
      Energia: ['PETR4'],
      Mineração: ['VALE3', 'SUZB3'],
      Financeiro: ['ITUB4', 'B3SA3'],
    },
    hint: 'O acumulador é um objeto índice. Isso é O(n) — montar o mesmo resultado com filter por setor seria O(n × setores).',
    angular: 'O mesmo padrão alimenta o gráfico de distribuição: agrupar uma vez e derivar, em vez de varrer a lista por categoria.',
  },
  {
    id: 'immutable-update',
    title: 'Atualização imutável',
    category: 'Estado',
    description: 'Mudar um item sem mutar o array — o que faz OnPush e signals funcionarem.',
    icon: 'sync_alt',
    input: { assets: ASSETS, symbol: 'ITUB4', price: 35.5 },
    code: `// Atualize o preço de um ativo retornando uma NOVA lista.
// Não use push, splice ou atribuição direta no item.
function solve(input) {
  const { assets, symbol, price } = input;
  return assets.map(asset =>
    asset.symbol === symbol ? { ...asset, price } : asset
  );
}`,
    expected: ASSETS.map(asset => (asset.symbol === 'ITUB4' ? { ...asset, price: 35.5 } : asset)),
    hint: 'O spread cria um novo objeto só para o item alterado; os demais mantêm a mesma referência e não são re-renderizados.',
    angular: 'É exatamente o corpo do `assets.update(...)` no `AssetService` quando chega um tick de preço.',
  },
  {
    id: 'dedupe-cost',
    title: 'Duplicatas: O(n²) vs O(n)',
    category: 'Complexidade',
    description: 'A mesma saída com custos diferentes — o argumento que a entrevista cobra.',
    icon: 'speed',
    input: ['PETR4', 'VALE3', 'PETR4', 'ITUB4', 'VALE3', 'PETR4'],
    code: `// Remova duplicatas preservando a ordem de primeira aparição.
// Versão ingênua: indexOf dentro de filter é O(n²).
// Troque por Set e explique o trade-off tempo × memória.
function solve(symbols) {
  const seen = new Set();
  const result = [];
  for (const symbol of symbols) {
    if (!seen.has(symbol)) {
      seen.add(symbol);
      result.push(symbol);
    }
  }
  return result;
}`,
    expected: ['PETR4', 'VALE3', 'ITUB4'],
    hint: 'Set troca O(n) de memória por lookup médio O(1). `[...new Set(symbols)]` resolve em uma linha e já preserva a ordem.',
    angular: 'A lista de setores do filtro usa esse padrão: `[...new Set(assets.map(a => a.sector))]`.',
  },
  {
    id: 'derived-metrics',
    title: 'Métricas derivadas do estado',
    category: 'Estado',
    description: 'Uma função pura do estado: o formato que qualquer computed() deveria ter.',
    icon: 'query_stats',
    input: ASSETS,
    code: `// Calcule: total de ativos ativos, volume somado e o de maior preço.
function solve(assets) {
  const active = assets.filter(asset => asset.active);
  return {
    count: active.length,
    volume: active.reduce((sum, asset) => sum + asset.volume, 0),
    top: active.reduce((best, asset) => (asset.price > best.price ? asset : best)).symbol,
  };
}`,
    expected: { count: 4, volume: 124_700_000, top: 'VALE3' },
    hint: 'Nenhum estado novo é criado: tudo é função da lista. Guardar `count` em outro signal seria duplicação.',
    angular: 'Os cards de resumo do dashboard são exatamente isto dentro de `computed()` — derivados, nunca setados à mão.',
  },
];
