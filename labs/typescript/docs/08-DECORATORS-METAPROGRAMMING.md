# TypeScript — decorators e metaprogramação

Decorators modernos observam ou substituem classes e membros durante a definição. São úteis em infraestrutura, mas escondem fluxo e devem ser adotados com critério.

## Decorator de método

```ts
function logged<This, Args extends unknown[], Return>(
  original: (this: This, ...args: Args) => Return,
  context: ClassMethodDecoratorContext<This>
) {
  return function (this: This, ...args: Args): Return {
    console.debug(String(context.name), args);
    return original.call(this, ...args);
  };
}
```

Os generics preservam `this`, parâmetros e retorno do método decorado.

## Decorators não são tipos

Adicionar comportamento em runtime não altera automaticamente o tipo público percebido pelo TypeScript. API dinâmica e contrato estático precisam continuar alinhados.

## Metadata

Metadata pode apoiar DI, serialização e validação, mas aumenta acoplamento a reflection e configuração do compilador. Prefira contratos explícitos em código de domínio.

## Quando evitar

- regra de negócio central;
- transformação difícil de rastrear;
- comportamento que composição expressa claramente;
- biblioteca pública sem documentação do runtime gerado.

## Perguntas de revisão

- O decorator preserva assinatura e `this`?
- A ordem entre decorators importa?
- O custo aparece no bundle ou startup?
- Testes cobrem o comportamento aplicado e não aplicado?

