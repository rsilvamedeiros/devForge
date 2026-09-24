# Debugging, observabilidade e operação

Aplicações Angular não terminam no build. É preciso diagnosticar falhas, observar comportamento real, entregar artefatos previsíveis e manter versões suportadas.

## Fluxo de debugging

1. Reproduza com entrada e ambiente mínimos.
2. Classifique: template, estado, rede, Router, DI, rendering ou build.
3. Reduza o escopo antes de alterar código.
4. Formule uma hipótese e busque evidência no DevTools.
5. Crie teste de regressão antes ou junto da correção.

Angular DevTools inspeciona árvore de componentes, providers, propriedades e change detection. Browser DevTools cobre requests, performance, memory, accessibility e source maps.

## Erros frequentes

- `NullInjectorError`: provider ausente ou no escopo incorreto.
- `ExpressionChangedAfterItHasBeenCheckedError`: estado alterado depois da verificação.
- Chunk lazy falha após deploy: HTML antigo aponta para assets removidos.
- Hydration mismatch: servidor e cliente produziram árvores diferentes.
- Memory leak: subscriptions, timers, observers ou listeners sobreviveram ao componente.

## Error handling

Interceptors tratam preocupações HTTP transversais, mas a feature conhece o contexto e decide retry, fallback ou ação. Um `ErrorHandler` global é a última rede para logging, não substituto de tratamento local.

```ts
provideHttpClient(withInterceptors([
  correlationIdInterceptor,
  authInterceptor
]))
```

Nunca registre tokens, senhas, payloads sensíveis ou PII. Inclua route, versão, correlation ID e contexto técnico seguro.

## Build, deploy e cache

- Configure budgets para impedir crescimento silencioso.
- Assets com hash recebem cache longo e imutável.
- `index.html` precisa revalidar para descobrir novos hashes.
- SPA exige fallback de rotas para o documento principal.
- SSR exige monitoramento de latência, memória e erros do servidor.
- Feature flags permitem desligar mudanças de risco sem novo deploy.

## Upgrades

Use `ng update`, leia migrations, atualize uma major por vez e rode testes/build em cada etapa. Remova APIs deprecated. Atualize Node e TypeScript conforme a matriz suportada pelo Angular.

## Observabilidade mínima

Colete erros não tratados, Web Vitals, falhas HTTP, duração de navegação e versão do frontend. Alertas devem refletir impacto no usuário; métricas sem ação definida viram custo.
