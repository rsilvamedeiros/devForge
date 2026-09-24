# Angular — DI, dados e navegação

## Dependency Injection

Providers têm escopo. `providedIn: 'root'` cria singleton da aplicação; provider em rota ou componente cria instância limitada à subárvore. Use `InjectionToken` para contratos sem classe concreta.

```ts
export const PRICE_FEED = new InjectionToken<PriceFeed>('PRICE_FEED');
{ provide: PRICE_FEED, useClass: SimulatedPriceFeed }
```

## Services

Services coordenam acesso a dados e casos de uso. Evite service como depósito genérico de toda regra e todo estado. Domínio testável pode permanecer em funções/classes puras.

## Reactive Forms

Formulários tipados representam estado de edição, validação e submissão. Diferencie validação síncrona, assíncrona, cross-field e regra de domínio.

```ts
form = new FormGroup({
  symbol: new FormControl('', { nonNullable: true, validators: Validators.required }),
  quantity: new FormControl(1, { nonNullable: true, validators: Validators.min(1) }),
});
```

## Router

Rotas lazy reduzem bundle inicial. Params representam identidade; query params representam visão compartilhável; guards controlam navegação, não segurança do backend. Resolvers só valem quando a rota não pode existir sem o dado.

## HttpClient

Tipar resposta não valida runtime. Mapeie DTO para domínio e trate loading, erro, cancelamento e retry conscientemente. Interceptors servem para concerns transversais como autenticação, correlação e telemetria.

## Segurança

O backend sempre revalida autorização e dados. Evite bypass de sanitização, HTML não confiável e tokens sensíveis em locais vulneráveis. Guards melhoram UX, mas não protegem recursos remotamente.
