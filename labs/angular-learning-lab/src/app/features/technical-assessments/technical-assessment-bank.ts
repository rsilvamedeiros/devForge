import { Question } from '../assessments/question-bank';

export type Seniority = 'Júnior' | 'Pleno' | 'Sênior';
export type AssessmentMode = 'quiz' | 'mock';

export interface TechnicalAssessmentPack {
  id: string;
  title: string;
  level: Seniority;
  mode: AssessmentMode;
  description: string;
  duration: number;
  passScore: number;
  focus: string[];
  questions: Question[];
}

const junior: Question[] = [
  {id:'jr-1',statement:'Qual responsabilidade pertence a um componente Angular?',options:['Persistir diretamente no banco','Controlar uma unidade de interface e sua interação','Configurar o servidor HTTP','Compilar TypeScript'],answer:1,explanation:'Componentes representam unidades de UI. Persistência e infraestrutura ficam atrás de serviços e APIs.'},
  {id:'jr-2',statement:'O que os colchetes representam em `[disabled]="form.invalid"`?',options:['Event binding','Property binding','Interpolção','Two-way binding'],answer:1,explanation:'Property binding avalia a expressão e escreve na propriedade do elemento ou componente.'},
  {id:'jr-3',statement:'Qual expressão preserva corretamente a identidade de uma lista?',code:'@for (course of courses(); track ???) { ... }',options:['$index sempre','course.id','course.title.length','courses.length'],answer:1,explanation:'Uma chave estável do item permite ao Angular reaproveitar o DOM mesmo quando a ordem muda.'},
  {id:'jr-4',statement:'Quando usar `computed()`?',options:['Para executar HTTP','Para derivar valor de outros signals','Para emitir output','Para declarar uma rota'],answer:1,explanation:'Computed representa estado derivado, memoizado e sem efeitos colaterais.'},
  {id:'jr-5',statement:'O que `Validators.required` faz?',options:['Remove null do tipo','Impede submit nativo','Adiciona um erro quando o controle não possui valor exigido','Desabilita o campo vazio'],answer:2,explanation:'O validator altera a validade; mensagens e bloqueio do submit continuam sendo responsabilidade da UI.'},
  {id:'jr-6',statement:'Qual hook é adequado para cleanup manual?',options:['ngOnInit','ngOnChanges','ngOnDestroy','ngAfterViewChecked'],answer:2,explanation:'ngOnDestroy é executado antes de destruir a instância. Prefira também APIs vinculadas a DestroyRef quando possível.'},
];

const pleno: Question[] = [
  {id:'pl-1',statement:'Uma busca dispara HTTP a cada termo. Qual operador descarta resultados obsoletos?',options:['concatMap','switchMap','mergeMap','exhaustMap'],answer:1,explanation:'switchMap troca para o stream mais novo e cancela a assinatura anterior.'},
  {id:'pl-2',statement:'Onde mapear `CourseDto` para `Course`?',options:['No template','No adapter/service de infraestrutura','Em cada componente consumidor','No interceptor global'],answer:1,explanation:'A fronteira HTTP traduz o contrato externo, impedindo que DTOs vazem pela aplicação.'},
  {id:'pl-3',statement:'Qual problema surge ao mutar um objeto recebido por input em OnPush?',options:['Erro de compilação','A referência não muda e consumidores podem não renderizar','O objeto vira readonly automaticamente','O Router reinicia'],answer:1,explanation:'OnPush e memoização dependem de fronteiras previsíveis. Atualizações imutáveis trocam a referência.'},
  {id:'pl-4',statement:'Quando `toSignal()` é mais apropriado?',options:['Antes de qualquer operador RxJS','Na fronteira em que a UI precisa ler o último valor sincronicamente','Para substituir todo Observable','Para executar side effects'],answer:1,explanation:'Mantenha composição temporal em RxJS e converta perto do consumidor síncrono.'},
  {id:'pl-5',statement:'Qual teste valida uma chamada HttpClient sem rede?',options:['Somente um spy em console.log','HttpTestingController','RouterTestingHarness','ComponentHarness'],answer:1,explanation:'HttpTestingController captura a request e permite verificar método, URL e payload antes de responder.'},
  {id:'pl-6',statement:'Qual estado deve ficar em query params?',options:['Token secreto','Filtro e paginação compartilháveis','Instância de service','Resultado completo da API'],answer:1,explanation:'Query params tornam filtros e paginação recuperáveis, navegáveis e compartilháveis.'},
];

const senior: Question[] = [
  {id:'sr-1',statement:'Um `effect` copia todo valor de A para B. Qual o problema arquitetural?',options:['Effect não pode ler signals','Cria duas fontes de verdade e sincronização acidental','Signals não aceitam strings','OnPush deixa de funcionar'],answer:1,explanation:'Se B é função de A, deve ser computed. Effects servem para sincronizar com sistemas externos.'},
  {id:'sr-2',statement:'Quando uma facade realmente agrega valor?',options:['Sempre que existe um service','Quando estabiliza um contrato e reduz acoplamento de múltiplos consumidores','Para renomear cada método do repository','Para esconder tipos'],answer:1,explanation:'Facade é útil quando protege consumidores de orquestração e mudanças; delegação 1:1 costuma ser cerimônia.'},
  {id:'sr-3',statement:'Qual risco existe em fornecer um store no injector raiz sem necessidade?',options:['Nenhum','Estado sobrevive entre contextos e cria acoplamento global acidental','O build falha','Impede lazy loading'],answer:1,explanation:'O escopo do provider define ciclo de vida e compartilhamento. Estado de feature deve acompanhar a fronteira adequada.'},
  {id:'sr-4',statement:'Como escolher entre SSR e CSR?',options:['SSR é sempre melhor','Pelo framework favorito','Por SEO, latência, personalização, cache e custo operacional','Pelo tamanho da equipe somente'],answer:2,explanation:'Renderização é decisão de produto e operação, não uma otimização universal.'},
  {id:'sr-5',statement:'Por que um guard não garante autorização?',options:['Guards são lentos','O cliente pode ser contornado; o servidor deve validar permissão','Guards só funcionam em SSR','Porque usam Observable'],answer:1,explanation:'Todo código cliente está sob controle do usuário. Guard melhora UX; autorização pertence ao backend.'},
  {id:'sr-6',statement:'Qual sinal indica que uma biblioteca compartilhada foi extraída cedo demais?',options:['Possui testes','Tem um consumidor e seu contrato muda junto com ele','Usa TypeScript strict','Possui README'],answer:1,explanation:'Sem reuso real e contrato estável, a extração aumenta coordenação sem reduzir duplicação relevante.'},
];

const pools: Record<Seniority, Question[]> = {'Júnior':junior,'Pleno':pleno,'Sênior':senior};
const descriptions: Record<Seniority,string> = {
  'Júnior':'Fundamentos, templates, componentes, forms e ciclo de vida.',
  'Pleno':'Estado, RxJS, dados, Router, testes e organização por feature.',
  'Sênior':'Arquitetura, escopo, rendering, segurança e decisões de evolução.',
};

export const TECHNICAL_ASSESSMENTS: TechnicalAssessmentPack[] = (Object.keys(pools) as Seniority[]).flatMap(level => [
  {id:`quiz-${level.toLowerCase()}`,title:`Provinha ${level}`,level,mode:'quiz',description:descriptions[level],duration:8,passScore:67,focus:level === 'Júnior' ? ['fundamentos','templates','forms'] : level === 'Pleno' ? ['RxJS','estado','testes'] : ['arquitetura','segurança','SSR'],questions:pools[level].slice(0,3)},
  {id:`mock-${level.toLowerCase()}`,title:`Simulado ${level}`,level,mode:'mock',description:descriptions[level],duration:level === 'Júnior' ? 20 : level === 'Pleno' ? 25 : 30,passScore:80,focus:level === 'Júnior' ? ['base Angular','componentes','reatividade'] : level === 'Pleno' ? ['integração','qualidade','ownership'] : ['trade-offs','boundaries','escala'],questions:pools[level]},
]);

export const TECHNICAL_QUESTION_COUNT = junior.length + pleno.length + senior.length;
