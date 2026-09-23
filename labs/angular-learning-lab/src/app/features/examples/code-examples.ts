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
  /** Saída esperada da implementação de referência. */
  expected: unknown;
  hint: string;
  angular: string;
}

const LESSONS = [
  { id: 1, title: 'Componentes', track: 'Fundamentos', minutes: 35, completed: true },
  { id: 2, title: 'Templates', track: 'Fundamentos', minutes: 40, completed: true },
  { id: 3, title: 'Signals', track: 'Reatividade', minutes: 55, completed: false },
  { id: 4, title: 'RxJS', track: 'Reatividade', minutes: 60, completed: false },
  { id: 5, title: 'Testes', track: 'Qualidade', minutes: 45, completed: false },
];

export const CODE_EXAMPLES: CodeExample[] = [
  {
    id: 'filter-map',
    title: 'Filtrar e projetar uma lista',
    category: 'Arrays',
    description: 'Filtre aulas pendentes e projete apenas os campos necessários para a interface.',
    icon: 'filter_alt',
    input: LESSONS,
    code: `// Retorne as aulas pendentes com duração de ao menos 45 minutos,
// projetando apenas { title, minutes }.
function solve(lessons) {
  return lessons
    .filter(lesson => !lesson.completed && lesson.minutes >= 45)
    .map(lesson => ({ title: lesson.title, minutes: lesson.minutes }));
}`,
    expected: [
      { title: 'Signals', minutes: 55 },
      { title: 'RxJS', minutes: 60 },
      { title: 'Testes', minutes: 45 },
    ],
    hint: 'Separe seleção e projeção: `filter` decide quem entra; `map` decide o formato da saída.',
    angular: 'Em Angular, essa lista pode viver em um `computed()` derivado dos filtros e da fonte original.',
  },
  {
    id: 'group-by',
    title: 'Agrupar por trilha',
    category: 'Arrays',
    description: 'Transforme uma lista em um índice para renderizar seções sem buscas repetidas.',
    icon: 'workspaces',
    input: LESSONS,
    code: `// Agrupe os títulos por trilha: { Fundamentos: ['Componentes', ...] }.
function solve(lessons) {
  return lessons.reduce((groups, lesson) => {
    groups[lesson.track] ??= [];
    groups[lesson.track].push(lesson.title);
    return groups;
  }, {});
}`,
    expected: {
      Fundamentos: ['Componentes', 'Templates'],
      Reatividade: ['Signals', 'RxJS'],
      Qualidade: ['Testes'],
    },
    hint: 'O acumulador é um objeto indexado pela trilha. A transformação inteira custa O(n).',
    angular: 'O template pode percorrer esse índice com `@for`, mantendo a transformação fora da view.',
  },
  {
    id: 'immutable-update',
    title: 'Atualização imutável',
    category: 'Estado',
    description: 'Conclua uma aula sem mutar o array recebido.',
    icon: 'sync_alt',
    input: { lessons: LESSONS, id: 3 },
    code: `// Marque a aula indicada como concluída e retorne uma NOVA lista.
function solve(input) {
  const { lessons, id } = input;
  return lessons.map(lesson =>
    lesson.id === id ? { ...lesson, completed: true } : lesson
  );
}`,
    expected: LESSONS.map(lesson => lesson.id === 3 ? { ...lesson, completed: true } : lesson),
    hint: 'Crie um novo objeto somente para o item alterado; os demais podem preservar suas referências.',
    angular: 'Esse é o padrão usado dentro de `signal.update()` com componentes `OnPush`.',
  },
  {
    id: 'dedupe-cost',
    title: 'Duplicatas: O(n²) vs O(n)',
    category: 'Complexidade',
    description: 'Compare duas soluções equivalentes e explique o custo de tempo e memória.',
    icon: 'speed',
    input: ['Signals', 'RxJS', 'Signals', 'Router', 'RxJS', 'Testes'],
    code: `// Remova duplicatas preservando a ordem de primeira aparição.
function solve(topics) {
  const seen = new Set();
  const result = [];
  for (const topic of topics) {
    if (!seen.has(topic)) {
      seen.add(topic);
      result.push(topic);
    }
  }
  return result;
}`,
    expected: ['Signals', 'RxJS', 'Router', 'Testes'],
    hint: '`Set` troca O(n) de memória por consultas médias O(1), reduzindo o custo total para O(n).',
    angular: 'Use o mesmo raciocínio ao derivar opções únicas para filtros de uma lista.',
  },
  {
    id: 'derived-metrics',
    title: 'Métricas derivadas do estado',
    category: 'Estado',
    description: 'Calcule o progresso como função pura da fonte de dados.',
    icon: 'query_stats',
    input: LESSONS,
    code: `// Calcule total, concluídas, minutos concluídos e percentual.
function solve(lessons) {
  const completed = lessons.filter(lesson => lesson.completed);
  return {
    total: lessons.length,
    completed: completed.length,
    minutes: completed.reduce((sum, lesson) => sum + lesson.minutes, 0),
    percent: Math.round(completed.length / lessons.length * 100),
  };
}`,
    expected: { total: 5, completed: 2, minutes: 75, percent: 40 },
    hint: 'Nenhuma métrica precisa ser gravada separadamente: todas nascem da lista de aulas.',
    angular: 'Essa função pura tem o formato ideal para um `computed()` testável.',
  },
];
