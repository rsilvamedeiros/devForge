/**
 * Índice leve das provas. Mantido separado de `question-bank.ts` porque a sidebar
 * só precisa da contagem — importar o banco inteiro traria todo o texto das
 * questões para o bundle inicial.
 */
export const EXAM_INDEX: { id: string; title: string }[] = [
  { id: 'fundamentals', title: 'Fundamentos e plataforma' },
  { id: 'components', title: 'Componentes e templates' },
  { id: 'di-data', title: 'DI, dados e navegação' },
  { id: 'signals-rxjs', title: 'Signals, RxJS e estado' },
  { id: 'quality', title: 'Qualidade e arquitetura' },
];
