# TypeScript — async, erros e runtime

## Promise e async/await

Função `async` sempre retorna Promise. `await` suspende a função, não a thread. Use `Promise.all` para independência, `allSettled` quando todos os resultados importam e execução sequencial quando ordem/limite exigem.

## Erros

Catch deve tratar valor como `unknown`. Faça narrowing antes de ler `.message`. Diferencie falha de validação, transitória, permanente e programação; retry indiscriminado piora incidentes.

```ts
try { await gateway.execute(order); }
catch (error: unknown) {
  if (error instanceof TransientError) scheduleRetry(order);
  else throw error;
}
```

## Result types

Quando falha é parte esperada do fluxo, uma union `Result` pode ser mais explícita que exceção. Exceção continua adequada para falha inesperada ou integração rejeitada.

## Validação runtime

Valide JSON e dados externos manualmente ou com schema. Depois da validação, converta DTO para domínio. Não faça cast direto de `response.json()`.

## Cancelamento e tempo

Use `AbortSignal` para operações canceláveis. Timeout, retry, backoff e clock devem ser dependências testáveis. Evite `setTimeout` escondido dentro de regra de domínio.

## Concorrência

JavaScript é single-threaded por padrão, mas operações async intercalam. Race conditions ainda existem em estado compartilhado, respostas fora de ordem e duplicidade de mensagem.
