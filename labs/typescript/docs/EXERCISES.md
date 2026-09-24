# Exercícios — TypeScript Academy

Resolva com `strict`, sem `any` e sem casts que apenas silenciem o compilador. Para cada entrega, registre decisão, testes e trade-offs.

## Nível Júnior — fundamentos

### 1. Parse de erro desconhecido

Implemente `errorMessage(error: unknown): string` usando narrowing para Error, string e fallback.

**Critérios:** nenhum cast; testes para quatro entradas; retorno sempre definido.

### 2. Estados de requisição

Substitua `{ loading?: boolean; error?: string; data?: Course[] }` por união discriminada.

**Critérios:** estados inválidos impossíveis; switch exaustivo; função de render por estado.

### 3. Carrinho readonly

Modele itens imutáveis e implemente add/remove sem mutar a entrada.

**Critérios:** `ReadonlyArray`; retorno inferido; referências preservadas quando possível.

### 4. Filtro genérico

Implemente uma função que filtra objetos por chave e valor compatível.

**Critérios:** `K extends keyof T`; valor `T[K]`; nenhum overload desnecessário.

### 5. Result de validação

Crie `Result<T, E>` e um parser de idade positiva.

**Critérios:** discriminante; erro tipado; consumidor sem non-null assertion.

### 6. Reducer exaustivo

Modele add, update e remove em uma union de actions.

**Critérios:** payload específico; `never`; imutabilidade.

## Nível Pleno — transformação e runtime

### 7. Pick por função

Implemente `pick<T, K extends keyof T>(object, keys): Pick<T, K>`.

**Critérios:** retorno correto para tuple literal; sem `any`; type tests.

### 8. DeepReadonly

Crie mapped type recursivo preservando funções e arrays readonly.

**Critérios:** primitive case; function case; objeto aninhado; limite explicado.

### 9. Event map

Modele emitter onde nome do evento determina payload do listener e do emit.

**Critérios:** mapa genérico; unsubscribe; erro de compilação para payload trocado.

### 10. Parser de API

Receba `unknown`, valide uma lista de cursos e retorne erros com path do campo.

**Critérios:** zero casts na API pública; erro acumulado; teste de payload parcial.

### 11. Branded IDs

Crie UserId, CourseId e EnrollmentId com factories validadas.

**Critérios:** ids incompatíveis; serialização como string; factory como única entrada.

### 12. Query builder

Modele filtros onde operadores dependem do tipo da propriedade.

**Critérios:** string aceita contains; number aceita gt/lt; boolean aceita equals.

## Nível Sênior — arquitetura

### 13. Route params

Extraia parâmetros de uma string de rota com template literal types.

**Critérios:** múltiplos parâmetros; rota sem parâmetro produz objeto vazio; type tests.

### 14. Pool de concorrência

Implemente `mapPool` com limite, preservação de ordem e AbortSignal.

**Critérios:** nunca exceder limite; cancelar novas tarefas; definir política de falha.

### 15. Biblioteca dual

Configure package ESM com declarations, exports e subpath `./testing`.

**Critérios:** consumo por app de exemplo; nenhum deep import; type tests em CI.

### 16. Backoff exponencial

Implemente retry com clock, jitter e classificação de falhas injetáveis.

**Critérios:** testes determinísticos; idempotência discutida; limite configurável.

### 17. Replay de DLQ

Inspecione e reenfileire mensagens após correção operacional.

**Critérios:** histórico preservado; evento de auditoria; replay duplicado bloqueado.

### 18. Inbox/outbox

Modele persistência que aproxime consumo e efeito atômicos.

**Critérios:** ADR; crash entre etapas; migração; limites de consistência explícitos.

## Protocolo de entrega

Para cada exercício:

1. escreva exemplos positivos e negativos antes da solução;
2. execute `npm run build:typescript` para validar compile time;
3. crie testes runtime quando houver comportamento emitido;
4. registre o motivo de cada cast inevitável;
5. explique complexidade e impacto no compilador;
6. compare uma alternativa mais simples.

## Evidência

Uma solução só está concluída quando você consegue explicar por que o contrato aceita casos válidos, rejeita inválidos e continua sustentável para outro desenvolvedor.
