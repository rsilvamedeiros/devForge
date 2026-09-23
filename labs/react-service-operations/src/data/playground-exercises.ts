export interface PlaygroundExercise{id:string;level:string;title:string;goal:string;starter:string;input:unknown;expected:unknown;hint:string}
export const PLAYGROUND_EXERCISES:PlaygroundExercise[]=[
{id:'immutable-toggle',level:'Júnior',title:'Atualização imutável',goal:'Alterne completed sem mutar a coleção original.',starter:`function solve(input) {
  const { items, id } = input;
  // retorne uma nova coleção
}`,input:{items:[{id:1,completed:false},{id:2,completed:true}],id:1},expected:[{id:1,completed:true},{id:2,completed:true}],hint:'Use map e spread somente no item correspondente.'},
{id:'derive-view',level:'Júnior',title:'Estado derivado',goal:'Filtre e ordene cursos sem armazenar uma segunda fonte de verdade.',starter:`function solve(input) {
  const { courses, query } = input;
}`,input:{courses:[{title:'React',hours:8},{title:'Router',hours:3},{title:'TypeScript',hours:6}],query:'r'},expected:[{title:'Router',hours:3},{title:'React',hours:8}],hint:'filter seguido de sort; preserve a entrada.'},
{id:'reducer-events',level:'Pleno',title:'Reducer previsível',goal:'Aplique uma sequência de actions mantendo a função pura.',starter:`function solve(input) {
  return input.actions.reduce((state, action) => {
    // increment, decrement e reset
    return state;
  }, input.initial);
}`,input:{initial:2,actions:[{type:'increment'},{type:'increment'},{type:'decrement'}]},expected:3,hint:'Cada action retorna o próximo número; reset volta a zero.'},
{id:'query-keys',level:'Sênior',title:'Query keys estáveis',goal:'Normalize filtros para produzir uma chave determinística de cache.',starter:`function solve(filters) {
  // retorne ['courses', objeto normalizado]
}`,input:{page:2,status:'active',search:'  React '},expected:['courses',{page:2,search:'react',status:'active'}],hint:'Construa um novo objeto em ordem conhecida e normalize search.'},
];
