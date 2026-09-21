# Preparação de entrevista

## Script mental para live coding

1. "Vou confirmar se entendi a entrada e a saída."
2. "Existem restrições de tamanho?"
3. "Duplicados são possíveis?"
4. "A ordem precisa ser preservada?"
5. "Vou começar por uma solução simples e correta."
6. Implementar.
7. Testar exemplos.
8. "Essa solução é O(...), usando O(...) de espaço."
9. "Se o volume crescer, eu consideraria..."
10. Discutir trade-off.

## Mudanças que devem ser simuladas

- agora não pode haver duplicados;
- agora são 10 milhões de itens;
- agora precisamos preservar ordem;
- agora os dados chegam continuamente;
- agora a operação pode falhar;
- agora o mesmo evento pode chegar novamente;
- agora o frontend precisa refletir atualizações em tempo real.

## Perguntas rápidas

- map vs forEach?
- find vs filter?
- slice vs splice?
- sort muta?
- Map vs Object?
- Map vs Array?
- Set vs Array?
- O(n) vs O(n²)?
- time vs space complexity?
- interface vs abstract class?
- composição vs herança?
- polimorfismo?
- SRP/OCP/DIP?
- FIFO?
- ACK/retry/DLQ?
- idempotência?
- Signal vs Observable?
- Subject vs BehaviorSubject?
- switchMap vs mergeMap?
- OnPush?
- `track` no `@for`?
