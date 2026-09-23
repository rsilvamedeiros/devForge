export interface LearningModule {
  id: string;
  step: string;
  title: string;
  description: string;
  icon: string;
  skills: string[];
  /** Prova que comprova o domínio deste módulo. */
  exam: string;
}

export const LEARNING_MODULES: LearningModule[] = [
  { id: 'components', step: '01', title: 'Componentes e navegação', description: 'Standalone components, Angular Material e rotas carregadas sob demanda.', icon: 'view_quilt', skills: ['components', 'router', 'Material'], exam: 'components' },
  { id: 'signals', step: '02', title: 'Signals e estado derivado', description: 'Estado reativo e indicadores derivados sem duplicação.', icon: 'electric_bolt', skills: ['signal', 'computed', 'OnPush'], exam: 'signals-rxjs' },
  { id: 'domain', step: '03', title: 'Formulários e domínio', description: 'Reactive Forms, modelagem polimórfica e processamento FIFO.', icon: 'account_tree', skills: ['forms', 'POO', 'generics'], exam: 'di-data' },
  { id: 'realtime', step: '04', title: 'HTTP e tempo real', description: 'DTO mapping, interceptor, RxJS e feed WebSocket intercambiável.', icon: 'sensors', skills: ['HttpClient', 'RxJS', 'WebSocket'], exam: 'fundamentals' },
  { id: 'quality', step: '05', title: 'Qualidade e arquitetura', description: 'Guardrails, fronteiras entre features e validação automatizada.', icon: 'verified_user', skills: ['testes', 'performance', 'arquitetura'], exam: 'quality' },
];
