export interface ChallengeTest{label:string;input:unknown;expected:unknown;hidden?:boolean}export interface CodingChallenge{id:string;level:'Júnior'|'Pleno'|'Sênior';category:string;title:string;description:string;requirements:string[];starter:string;hint:string;tests:ChallengeTest[]}
export const CODING_CHALLENGES:CodingChallenge[]=[
{id:'toggle-selection',level:'Júnior',category:'Imutabilidade',title:'Seleção imutável',description:'Alterne um id em uma seleção sem mutar a entrada.',requirements:['Retorne um novo array','Remova quando já selecionado','Preserve a ordem'],starter:`function solve(input) {
  const { selected, id } = input;
  // implemente aqui
}`,hint:'includes decide entre filter e spread.',tests:[{label:'adiciona id',input:{selected:[1,2],id:3},expected:[1,2,3]},{label:'remove id',input:{selected:[1,2,3],id:2},expected:[1,3]},{label:'lista vazia',input:{selected:[],id:4},expected:[4],hidden:true}]},
{id:'derive-cart',level:'Júnior',category:'Estado derivado',title:'Resumo do carrinho',description:'Derive quantidade e total a partir dos itens.',requirements:['Não altere itens','Considere quantity','Arredonde para duas casas'],starter:`function solve(items) {
  // retorne { quantity, total }
}`,hint:'Use reduce e Math.round(total * 100) / 100.',tests:[{label:'dois itens',input:[{price:10,quantity:2},{price:5.5,quantity:1}],expected:{quantity:3,total:25.5}},{label:'vazio',input:[],expected:{quantity:0,total:0}},{label:'decimais',input:[{price:1.15,quantity:3}],expected:{quantity:3,total:3.45},hidden:true}]},
{id:'reducer-machine',level:'Pleno',category:'Reducers',title:'Máquina de request',description:'Aplique eventos a um estado de request previsível.',requirements:['loading limpa erro','success guarda data','error preserva mensagem'],starter:`function solve(actions) {
  return actions.reduce((state, action) => {
    // loading | success | error
    return state;
  }, { status: 'idle', data: null, error: null });
}`,hint:'Retorne um novo objeto para cada action conhecida.',tests:[{label:'sucesso',input:[{type:'loading'},{type:'success',data:['React']}],expected:{status:'success',data:['React'],error:null}},{label:'falha',input:[{type:'loading'},{type:'error',error:'offline'}],expected:{status:'error',data:null,error:'offline'}},{label:'recuperação',input:[{type:'error',error:'x'},{type:'loading'}],expected:{status:'loading',data:null,error:null},hidden:true}]},
{id:'query-normalizer',level:'Pleno',category:'Server state',title:'Query key factory',description:'Normalize filtros para uma chave de cache estável.',requirements:['Busca em lowercase','Página mínima 1','Status padrão all'],starter:`function solve(filters) {
  // retorne ['courses', normalizedFilters]
}`,hint:'Crie o objeto em ordem page, search, status.',tests:[{label:'normaliza',input:{page:0,search:' React ',status:''},expected:['courses',{page:1,search:'react',status:'all'}]},{label:'preserva',input:{page:3,search:'hooks',status:'active'},expected:['courses',{page:3,search:'hooks',status:'active'}]},{label:'ausentes',input:{},expected:['courses',{page:1,search:'',status:'all'}],hidden:true}]},
{id:'permission-view',level:'Sênior',category:'Arquitetura',title:'Matriz de capacidades',description:'Derive capacidades da UI sem espalhar verificações de papel.',requirements:['Admin possui todas','Editor não remove','Viewer apenas visualiza'],starter:`function solve(role) {
  // retorne { view, edit, remove }
}`,hint:'Modele uma tabela explícita por papel.',tests:[{label:'viewer',input:'viewer',expected:{view:true,edit:false,remove:false}},{label:'editor',input:'editor',expected:{view:true,edit:true,remove:false}},{label:'admin',input:'admin',expected:{view:true,edit:true,remove:true},hidden:true}]},
];
