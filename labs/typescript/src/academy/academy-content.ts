export type Level='Fundamentos'|'Intermediário'|'Avançado';
export interface Track{id:string;order:number;level:Level;title:string;description:string;topics:string[];hours:number}
export const TRACKS:Track[]=[
{id:'mental-model',order:1,level:'Fundamentos',title:'Modelo mental e inferência',description:'JavaScript, análise estática, annotations e inferência contextual.',topics:['compilação','inference','annotations','any vs unknown'],hours:4},
{id:'narrowing',order:2,level:'Fundamentos',title:'Unions e narrowing',description:'Modele possibilidades e prove tipos por controle de fluxo.',topics:['unions','guards','discriminated unions','never'],hours:5},
{id:'functions',order:3,level:'Fundamentos',title:'Funções e contratos',description:'Parâmetros, overloads, callbacks, variance e funções genéricas.',topics:['signatures','overloads','callbacks','this'],hours:5},
{id:'objects',order:4,level:'Intermediário',title:'Objetos e domínio',description:'Structural typing, interfaces, aliases, classes e composição.',topics:['interface','type','classes','readonly'],hours:5},
{id:'generics',order:5,level:'Intermediário',title:'Generics aplicados',description:'Constraints e relações preservadas entre entrada e saída.',topics:['constraints','keyof','indexed access','defaults'],hours:6},
{id:'transformations',order:6,level:'Intermediário',title:'Type transformations',description:'Mapped, conditional, template literal e utility types.',topics:['mapped types','conditional types','infer','templates'],hours:7},
{id:'runtime',order:7,level:'Intermediário',title:'Runtime e dados externos',description:'Validação, parsing, branded types e fronteiras não confiáveis.',topics:['unknown','parsers','type predicates','branding'],hours:5},
{id:'async',order:8,level:'Avançado',title:'Async e concorrência',description:'Promises, Result, cancelamento e erros tipados.',topics:['Promise','Result','AbortSignal','concurrency'],hours:5},
{id:'modules',order:9,level:'Avançado',title:'Módulos e bibliotecas',description:'ESM, declaration files, API pública e publicação de packages.',topics:['ESM','d.ts','exports','semver'],hours:5},
{id:'config',order:10,level:'Avançado',title:'Configuração e arquitetura',description:'tsconfig strict, monorepos, project references e performance.',topics:['tsconfig','strictness','references','boundaries'],hours:6},
{id:'testing',order:11,level:'Avançado',title:'Testes e qualidade',description:'Contratos executáveis, type tests e linting consciente.',topics:['Vitest','type tests','coverage','lint'],hours:4},
{id:'web-components',order:12,level:'Avançado',title:'TypeScript no navegador com Lit',description:'Propriedades reativas, eventos tipados e Web Components.',topics:['LitElement','reactivity','events','DOM types'],hours:6},
];
export interface DocItem{title:string;description:string;path:string}
export const DOCUMENTS:DocItem[]=[
{title:'Handbook TypeScript',description:'Mapa completo da linguagem e competências.',path:'/HANDBOOK.md'},
{title:'Sistema de tipos e narrowing',description:'Inferência, unions, guards, nullability e never.',path:'/01-TYPE-SYSTEM-NARROWING.md'},
{title:'Funções, generics e utilities',description:'Constraints, keyof, mapped e conditional types.',path:'/02-FUNCTIONS-GENERICS-UTILITIES.md'},
{title:'Objetos, classes e módulos',description:'Structural typing, composição, ESM e APIs públicas.',path:'/03-OBJECTS-CLASSES-MODULES.md'},
{title:'Async, erros e runtime',description:'Promise, unknown, validação e cancelamento.',path:'/04-ASYNC-ERRORS-RUNTIME.md'},
{title:'Configuração e arquitetura',description:'tsconfig, build, testes e boundaries.',path:'/05-CONFIG-QUALITY-ARCHITECTURE.md'},
{title:'Tipos avançados',description:'Conditional, infer, mapped e template literal types.',path:'/06-ADVANCED-TYPES.md'},
{title:'Validação em runtime',description:'Parsing seguro, schemas, brands e fronteiras.',path:'/07-RUNTIME-VALIDATION.md'},
{title:'Decorators e metaprogramação',description:'Decorators modernos, metadata e limites.',path:'/08-DECORATORS-METAPROGRAMMING.md'},
{title:'Lit e Web Components',description:'Reatividade, propriedades, eventos e slots tipados.',path:'/09-LIT-WEB-COMPONENTS.md'},
{title:'Design de bibliotecas',description:'APIs públicas, declarations, exports e type tests.',path:'/10-LIBRARY-DESIGN.md'},
{title:'Funções e variance',description:'Overloads, callbacks, this, covariance e contravariance.',path:'/11-FUNCTIONS-VARIANCE.md'},
{title:'Modelagem de domínio',description:'Estados válidos, Result, entities e invariantes.',path:'/12-DOMAIN-MODELING.md'},
{title:'Async e concorrência',description:'Promise, cancellation, pools e async iterators.',path:'/13-ASYNC-CONCURRENCY.md'},
{title:'tsconfig profissional',description:'Strictness, modules, references e builds.',path:'/14-TSCONFIG-PROFESSIONAL.md'},
{title:'Testes de tipos',description:'Compile-time assertions, ts-expect-error e CI.',path:'/15-TYPE-TESTING.md'},
{title:'Arquitetura TypeScript',description:'Boundaries, ownership e evolução de contratos.',path:'/16-TYPESCRIPT-ARCHITECTURE.md'},
{title:'Trilha de aprendizado',description:'Sequência sugerida e critérios de domínio.',path:'/LEARNING-PATH.md'},
{title:'Exercícios',description:'Prática guiada com progressão de dificuldade.',path:'/EXERCISES.md'},
];
export interface TypeChallenge{id:string;level:Level;title:string;brief:string;starter:string;solutionPattern:RegExp;hint:string;skills:string[]}
export const CHALLENGES:TypeChallenge[]=[
{id:'safe-error',level:'Fundamentos',title:'Erro desconhecido',brief:'Retorne a mensagem somente após provar que o valor é Error.',starter:`function errorMessage(error: unknown): string {\n  // implemente o narrowing\n  return 'Unknown error';\n}`,solutionPattern:/error\s+instanceof\s+Error/,hint:'Use instanceof para refinar unknown.',skills:['unknown','narrowing']},
{id:'exhaustive',level:'Fundamentos',title:'Reducer exaustivo',brief:'Modele três ações e prove que o switch cobre todas.',starter:`type Action = { type: 'add' } | { type: 'remove' } | { type: 'reset' };\nfunction reduce(action: Action) {\n  switch (action.type) {\n    // complete\n  }\n}`,solutionPattern:/never/,hint:'Atribua o caso impossível a never.',skills:['union','never']},
{id:'pluck',level:'Intermediário',title:'Pluck type-safe',brief:'Relacione a chave ao objeto e preserve o tipo do valor.',starter:`function pluck(object: unknown, key: unknown) {\n  return undefined;\n}`,solutionPattern:/<\s*T\s*,\s*K\s+extends\s+keyof\s+T\s*>/,hint:'Use T, K extends keyof T e T[K].',skills:['generics','keyof']},
{id:'readonly',level:'Intermediário',title:'DeepReadonly',brief:'Crie um mapped type recursivo que torne toda propriedade readonly.',starter:`type DeepReadonly<T> = unknown;`,solutionPattern:/readonly\s*\[/,hint:'Mapeie keyof T e aplique recursivamente.',skills:['mapped type','recursion']},
{id:'event-map',level:'Intermediário',title:'Event map',brief:'Derive uma união de eventos a partir de um mapa de payloads.',starter:`type Events = { created: { id: string }; deleted: { id: string } };\ntype DomainEvent<T> = unknown;`,solutionPattern:/\[K\s+in\s+keyof\s+T\]/,hint:'Mapped type seguido de indexed access.',skills:['mapped type','indexed access']},
{id:'infer-return',level:'Avançado',title:'Unwrap Promise',brief:'Extraia recursivamente o valor de uma Promise sem usar Awaited.',starter:`type Unwrap<T> = unknown;`,solutionPattern:/T\s+extends\s+Promise<infer\s+/,hint:'Conditional type com infer e recursão.',skills:['conditional','infer']},
{id:'routes',level:'Avançado',title:'Parâmetros de rota',brief:'Converta /courses/:courseId/lessons/:lessonId em um objeto tipado.',starter:`type RouteParams<Path extends string> = unknown;`,solutionPattern:/`[^`]*:\$\{infer\s+/,hint:'Use template literal types recursivos.',skills:['template literals','infer']},
{id:'brand',level:'Avançado',title:'IDs nominais',brief:'Impeça que UserId e CourseId sejam trocados apesar de ambos serem string.',starter:`type UserId = string;\ntype CourseId = string;`,solutionPattern:/unique\s+symbol|__brand/,hint:'Interseção com uma marca que não existe no runtime.',skills:['branding','domain modeling']},
{id:'result',level:'Fundamentos',title:'Result discriminado',brief:'Modele sucesso e falha sem booleanos opcionais.',starter:`type Result<T> = unknown;`,solutionPattern:/ok\s*:\s*true[\s\S]*ok\s*:\s*false|ok\s*:\s*false[\s\S]*ok\s*:\s*true/,hint:'Crie uma união discriminada por ok.',skills:['unions','domain modeling']},
{id:'satisfies',level:'Intermediário',title:'Configuração preservada',brief:'Valide um mapa de rotas sem perder os tipos literais.',starter:`const routes = { home: '/', course: '/courses/:id' };`,solutionPattern:/satisfies\s+Record/,hint:'Use satisfies Record<string, `/${string}`>.',skills:['satisfies','inference']},
{id:'deep-partial',level:'Avançado',title:'DeepPartial seguro',brief:'Transforme objetos recursivamente sem destruir funções.',starter:`type DeepPartial<T> = unknown;`,solutionPattern:/T\s+extends\s+Function|T\s+extends\s+\([^)]*\)\s*=>/,hint:'Trate funções antes de mapear objetos.',skills:['conditional','mapped type']},
{id:'typed-emitter',level:'Avançado',title:'Event emitter tipado',brief:'Relacione nomes de eventos aos respectivos payloads.',starter:`class Emitter<Events> {\n  on(event: unknown, listener: unknown) {}\n  emit(event: unknown, payload: unknown) {}\n}`,solutionPattern:/K\s+extends\s+keyof\s+Events/,hint:'Cada método precisa de K extends keyof Events e Events[K].',skills:['generics','callbacks','event maps']},
];
export interface Question{id:string;level:Level;prompt:string;options:string[];answer:number;explanation:string}
export const QUESTIONS:Question[]=[
{id:'q1',level:'Fundamentos',prompt:'Por que unknown é mais seguro que any?',options:['Ocupa menos memória','Exige narrowing antes do uso','Compila mais rápido','Impede valores null'],answer:1,explanation:'unknown aceita qualquer valor, mas bloqueia operações até que o tipo seja provado.'},
{id:'q2',level:'Fundamentos',prompt:'O que representa never?',options:['Valor opcional','Ausência de valor possível','Qualquer objeto','Erro em runtime'],answer:1,explanation:'never representa um estado que não pode acontecer e permite checar exaustividade.'},
{id:'q3',level:'Fundamentos',prompt:'Quando preferir inferência?',options:['Sempre anotar tudo','Quando o inicializador comunica o tipo com clareza','Nunca em funções','Somente em arrays'],answer:1,explanation:'Anotações redundantes adicionam ruído; declare contratos nas fronteiras.'},
{id:'q4',level:'Intermediário',prompt:'K extends keyof T garante que:',options:['K é uma classe','K é uma chave válida de T','T é readonly','K existe no runtime'],answer:1,explanation:'A constraint relaciona o parâmetro à união de chaves do objeto.'},
{id:'q5',level:'Intermediário',prompt:'TypeScript usa tipagem principalmente:',options:['Nominal','Estrutural','Dinâmica','Linear'],answer:1,explanation:'Compatibilidade depende da estrutura, salvo técnicas explícitas de branding.'},
{id:'q6',level:'Intermediário',prompt:'Qual tipo modela melhor sucesso ou falha esperada?',options:['any','boolean','Result discriminado','Error | null'],answer:2,explanation:'Uma união discriminada carrega dados próprios de cada estado e permite exaustividade.'},
{id:'q7',level:'Avançado',prompt:'O operador satisfies:',options:['Faz cast inseguro','Valida compatibilidade preservando inferência','Cria classe','Executa validação runtime'],answer:1,explanation:'satisfies verifica o contrato sem substituir o tipo inferido da expressão.'},
{id:'q8',level:'Avançado',prompt:'Conditional types distribuem quando:',options:['O tipo é any','O parâmetro nu recebe uma union','Há interface','strict está desligado'],answer:1,explanation:'T extends U distribui para cada membro quando T é parâmetro genérico nu.'},
{id:'q9',level:'Avançado',prompt:'Por que validar dados externos em runtime?',options:['Tipos são apagados após compilar','JSON não suporta arrays','Generics são lentos','Interfaces lançam erros'],answer:0,explanation:'TypeScript não valida rede, storage ou input após a emissão do JavaScript.'},
];
