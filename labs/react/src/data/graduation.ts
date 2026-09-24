export interface E2eScenario{id:string;area:string;title:string;journey:string[];assertions:string[];risk:string}
export const E2E_SCENARIOS:E2eScenario[]=[
{id:'auth',area:'Identidade',title:'Login e sessão expirada',journey:['Autenticar estudante','Restaurar sessão','Expirar token e redirecionar'],assertions:['Feedback acessível','Redirect preserva destino','Credenciais não vazam'],risk:'Fluxo crítico de acesso'},
{id:'catalog',area:'Descoberta',title:'Buscar e filtrar cursos',journey:['Abrir catálogo','Combinar busca e nível','Limpar filtros'],assertions:['URL representa filtros','Estado vazio orienta ação','Resultado mantém ordenação'],risk:'Perda de descoberta'},
{id:'enroll',area:'Conversão',title:'Matricular em um curso',journey:['Abrir detalhes','Confirmar matrícula','Acessar primeira aula'],assertions:['Ação idempotente','Toast anunciável','Dashboard atualizado'],risk:'Duplicidade de matrícula'},
{id:'lesson',area:'Aprendizagem',title:'Consumir aula e salvar progresso',journey:['Iniciar conteúdo','Marcar aula concluída','Reabrir o curso'],assertions:['Progresso persiste','Próxima aula desbloqueia','Barra possui nome acessível'],risk:'Perda de progresso'},
{id:'offline',area:'Resiliência',title:'Recuperar de falha de rede',journey:['Simular API indisponível','Exibir fallback','Tentar novamente'],assertions:['Conteúdo anterior permanece','Erro explica próximo passo','Retry refaz a query'],risk:'Tela branca em produção'},
{id:'permissions',area:'Segurança',title:'Bloquear ação sem permissão',journey:['Entrar como estudante','Forçar rota administrativa','Tentar chamada protegida'],assertions:['Servidor responde 403','UI remove ação indevida','Auditoria registra tentativa'],risk:'Escalada de privilégio'},
{id:'keyboard',area:'Acessibilidade',title:'Concluir jornada só com teclado',journey:['Navegar pelo header','Operar catálogo','Concluir modal'],assertions:['Foco sempre visível','Modal prende e devolve foco','Ordem segue leitura'],risk:'Usuário impedido de operar'},
{id:'visual',area:'Qualidade',title:'Validar responsividade essencial',journey:['Executar em mobile','Executar em tablet','Comparar desktop'],assertions:['Sem overflow horizontal','Conteúdo prioritário visível','Snapshot estável'],risk:'Regressão de layout'},
];
export const E2E_COUNT=E2E_SCENARIOS.length;
export interface ProgressMetric{id:string;label:string;done:number;total:number;weight:number;route:string}
function array(key:string):string[]{try{return JSON.parse(localStorage.getItem(key)??'[]')}catch{return[]}}
function assessment(level:string){try{const value=JSON.parse(localStorage.getItem(`react-learning-lab.assessment.${level}`)??'null');return value?.score>=4?1:0}catch{return 0}}
export function readProgress():ProgressMetric[]{return[
{id:'trail',label:'Trilha principal',done:array('nexa-learning-progress').length,total:5,weight:12,route:'/learning'},
{id:'arena',label:'Coding Arena',done:array('react-learning-lab.coding-arena').length,total:5,weight:16,route:'/coding-arena'},
{id:'assessments',label:'Avaliações',done:['Júnior','Pleno','Sênior'].reduce((sum,level)=>sum+assessment(level),0),total:3,weight:12,route:'/assessments'},
{id:'debugging',label:'Debugging Lab',done:array('react-learning-lab.debugging').length,total:6,weight:9,route:'/debugging-lab'},
{id:'performance',label:'Performance Lab',done:array('react-learning-lab.performance').length,total:6,weight:9,route:'/performance-lab'},
{id:'sandbox',label:'React Sandbox',done:array('react-learning-lab.sandbox.completed').length,total:3,weight:12,route:'/sandbox'},
{id:'capstone',label:'Projeto final',done:array('react-learning-lab.capstone').length,total:18,weight:22,route:'/capstone'},
{id:'e2e',label:'Cenários E2E',done:array('react-learning-lab.e2e').length,total:E2E_COUNT,weight:8,route:'/e2e-lab'},
]}
export function progressScore(metrics=readProgress()){return Math.round(metrics.reduce((sum,item)=>sum+Math.min(item.done/item.total,1)*item.weight,0))}
export function isCertified(metrics=readProgress()){return metrics.every(item=>item.done>=item.total)}
