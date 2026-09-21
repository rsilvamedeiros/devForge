# OOP em TypeScript

## Pilares

### Encapsulamento
Esconder estado/implementação e expor operações coerentes.

### Abstração
Representar o que importa através de contratos.

### Herança
Reutilização/especialização via `extends`; usar com critério.

### Polimorfismo
Consumir diferentes implementações através de um contrato comum.

## TypeScript

```ts
interface Order {
  execute(): void;
}

class BuyOrder implements Order {
  execute(): void {}
}

class SellOrder implements Order {
  execute(): void {}
}

function process(order: Order) {
  order.execute();
}
```

## Revisar

- class
- constructor
- public/private/protected
- readonly
- interface/implements
- abstract class
- extends
- generics
- composition
- dependency injection

## Perguntas

- interface vs abstract class?
- composição vs herança?
- polimorfismo sem herança?
- TypeScript é orientado a objetos?
- como Angular usa DI?
