# Plano intensivo — BTG — 2 dias

## Regra

60–70% do tempo deve envolver código, exercício, explicação ou desenho de arquitetura.

---

# Dia 1 — fundamentos + algoritmos + POO

## 08:30–10:30 — Arrays/Listas

Estudar e implementar:
- map
- filter
- reduce
- find
- findIndex
- some
- every
- includes
- sort
- forEach
- push/pop
- shift/unshift
- slice/splice
- flat/flatMap

Para cada método:
- muta?
- retorno?
- Big O aproximado?
- caso de frontend?
- equivalente/uso no Angular?

### Exercícios
1. maior/menor
2. duplicados
3. remover duplicados
4. frequência
5. first unique
6. groupBy
7. atualização imutável
8. interseção
9. ordenar objetos
10. total financeiro

## 10:30–12:00 — Data Structures + Big O

- Array
- Map
- Set
- Stack
- Queue
- Linked List (conceitual)
- O(1)
- O(log n)
- O(n)
- O(n log n)
- O(n²)
- space complexity

Resolver Two Sum brute force e com Map.

## 13:00–15:00 — POO TypeScript

- class/object
- encapsulation
- abstraction
- inheritance
- polymorphism
- interface
- abstract class
- composition
- generics
- DI

Implementar:
- Account
- BuyOrder/SellOrder
- OrderProcessor
- Queue<T>

## 15:00–16:00 — SOLID

Foco:
- SRP
- OCP
- DIP

## 16:00–18:00 — Jokenpô evolutivo

1. Pedra/Papel/Tesoura.
2. Testar.
3. Adicionar Lagarto/Spock.
4. Evitar explosão de if/else.
5. Aplicar OCP/Strategy/Map/Set quando fizer sentido.

## 19:00–21:00 — Live coding cronometrado

6–8 exercícios Easy/Medium:
- arrays
- hash maps
- stack/queue
- sorting/search

## 21:00–22:00 — explicação oral

Explicar sem consulta:
- métodos de Array;
- Big O;
- Map/Set;
- POO;
- SOLID;
- Queue.

---

# Dia 2 — Angular + filas + arquitetura + projeto

## 08:30–10:00 — Queue / mensageria

- FIFO
- producer
- consumer
- broker
- ACK
- retry
- DLQ
- idempotência
- ordering
- at-most-once
- at-least-once
- exactly-once (conceito/limitações)

## 10:00–11:30 — Arquitetura

Desenhar:

```text
Angular
  ↓
API Gateway
  ↓
Order Service
  ↓
Queue
  ↓
Processor
  ↓
Database
```

Market Data → WebSocket → Angular.

Responder cenários de falha.

## 12:30–14:30 — Angular moderno

- standalone
- components
- services
- DI
- HttpClient
- routing
- forms
- signals
- computed/effect
- state
- `@for`/track
- change detection
- OnPush
- lazy loading

## 14:30–16:00 — RxJS

- Observable
- Subject
- BehaviorSubject
- map/filter/tap
- switchMap
- mergeMap
- concatMap
- exhaustMap
- debounceTime
- distinctUntilChanged
- catchError
- combineLatest
- forkJoin

## 16:00–20:00 — Angular Digital Equities Lab

Implementar:
1. Asset model
2. lista mock
3. filtro/busca
4. Signal + computed
5. `@for` + track
6. service
7. API mock
8. Order model
9. criação de ordem
10. Queue didática
11. atualização de preço simulada
12. RxJS
13. estados loading/error/empty

## 20:00–22:00 — entrevista simulada

- 15 min perguntas rápidas
- 30–40 min live coding
- mudança de requisito
- Big O
- POO
- arquitetura
- Angular
- retrospectiva
