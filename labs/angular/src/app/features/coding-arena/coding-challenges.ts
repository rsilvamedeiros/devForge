export interface ArenaTest { label:string; input:unknown; expected:unknown; hidden?:boolean; }
export interface CodingChallenge { id:string; title:string; level:'Júnior'|'Pleno'|'Sênior'; category:string; description:string; requirements:string[]; starter:string; hint:string; tests:ArenaTest[]; }

export const CODING_CHALLENGES: CodingChallenge[] = [
  {id:'route-query',title:'Normalizar filtros da rota',level:'Júnior',category:'Router',description:'Converta query params externos em um estado seguro para a interface.',requirements:['page inteiro mínimo 1','term sem espaços nas pontas','status limitado a all, active ou done'],starter:`function solve(query) {
  // Retorne { page, term, status }.
  return query;
}`,hint:'Normalize cada fronteira separadamente e use uma whitelist para status.',tests:[{label:'entrada válida',input:{page:'2',term:' signals ',status:'active'},expected:{page:2,term:'signals',status:'active'}},{label:'defaults seguros',input:{page:'0',term:'  ',status:'admin'},expected:{page:1,term:'',status:'all'}},{label:'página inválida',input:{page:'abc',term:'RxJS'},expected:{page:1,term:'RxJS',status:'all'},hidden:true}]},
  {id:'immutable-course',title:'Atualizar progresso imutavelmente',level:'Júnior',category:'Signals',description:'Atualize somente o curso indicado sem mutar a coleção recebida.',requirements:['novo array','novo objeto apenas para o item alterado','percentual limitado entre 0 e 100'],starter:`function solve(input) {
  const { courses, id, progress } = input;
  // Implemente a atualização imutável.
}`,hint:'map seleciona o item; spread cria a nova referência; Math.min/Math.max limitam o valor.',tests:[{label:'atualiza o alvo',input:{courses:[{id:1,progress:10},{id:2,progress:30}],id:2,progress:80},expected:[{id:1,progress:10},{id:2,progress:80}]},{label:'limita em 100',input:{courses:[{id:1,progress:0}],id:1,progress:130},expected:[{id:1,progress:100}]},{label:'limita em zero',input:{courses:[{id:1,progress:20}],id:1,progress:-4},expected:[{id:1,progress:0}],hidden:true}]},
  {id:'request-state',title:'Derivar estado de uma request',level:'Pleno',category:'Estado',description:'Converta snapshot assíncrono em um view model exclusivo e previsível.',requirements:['loading tem prioridade','erro produz mensagem','lista vazia vira empty','dados viram ready'],starter:`function solve(snapshot) {
  // Retorne { kind: 'loading' | 'error' | 'empty' | 'ready', ... }.
}`,hint:'Use retornos antecipados para que os estados sejam mutuamente exclusivos.',tests:[{label:'carregando',input:{loading:true,error:null,value:[]},expected:{kind:'loading'}},{label:'falha',input:{loading:false,error:'Offline',value:null},expected:{kind:'error',message:'Offline'}},{label:'vazio',input:{loading:false,error:null,value:[]},expected:{kind:'empty'}},{label:'pronto',input:{loading:false,error:null,value:[1,2]},expected:{kind:'ready',items:[1,2]},hidden:true}]},
  {id:'permission-matrix',title:'Resolver matriz de permissões',level:'Sênior',category:'Arquitetura',description:'Implemente uma policy pura sem espalhar condicionais pelos componentes.',requirements:['admin pode tudo','viewer apenas read','editor pode read e write','recurso archived bloqueia write'],starter:`function solve(input) {
  const { role, action, archived } = input;
  // Retorne boolean.
}`,hint:'Modele primeiro as negativas globais e depois a matriz explícita por papel.',tests:[{label:'admin remove',input:{role:'admin',action:'delete',archived:false},expected:true},{label:'viewer não escreve',input:{role:'viewer',action:'write',archived:false},expected:false},{label:'editor lê',input:{role:'editor',action:'read',archived:false},expected:true},{label:'arquivo bloqueia escrita',input:{role:'admin',action:'write',archived:true},expected:false,hidden:true}]},
];
