# Funções, overloads e variance

Funções são contratos entre parâmetros, contexto e retorno. Em TypeScript, entender compatibilidade evita callbacks inseguros e overloads frágeis.

## Assinaturas

```ts
type Comparator<T> = (left: T, right: T) => number;
const byPrice: Comparator<Product> = (a, b) => a.price - b.price;
```

Prefira aliases para callbacks reutilizados e deixe a implementação ser inferida pelo contexto.

## Parâmetros opcionais

`value?: T` permite ausência. `value: T | undefined` exige que o argumento exista, mesmo que seja undefined. A diferença afeta chamadas e evolução de API.

## Overloads

```ts
function parse(value: string): string[];
function parse(value: ArrayBuffer): Uint8Array;
function parse(value: string | ArrayBuffer) {
  return typeof value === 'string' ? value.split(',') : new Uint8Array(value);
}
```

Use overload quando entradas diferentes produzem retornos relacionados. Se o retorno não depende da entrada, uma union comum é mais simples.

## this explícito

```ts
function format(this: Intl.NumberFormat, value: number) {
  return this.format(value);
}
```

O parâmetro `this` existe apenas para análise e não é emitido no JavaScript.

## Variance

Retornos tendem a ser covariantes: uma função que retorna subtipo atende quem espera o tipo base. Parâmetros sob `strictFunctionTypes` são contravariantes: um callback precisa aceitar pelo menos tudo que o chamador pode enviar.

```ts
type Handler<T> = (value: T) => void;
```

Não use bivariance ou casts para silenciar incompatibilidades sem entender quem produz e quem consome o valor.

## Checklist

- O retorno depende do tipo de entrada?
- O callback aceita todos os valores possíveis?
- Um objeto de opções substituiria parâmetros posicionais?
- O overload público está coberto por type tests?

