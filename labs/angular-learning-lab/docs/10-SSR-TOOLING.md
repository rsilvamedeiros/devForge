# SSR, hydration e tooling

## Estratégias de renderização

- CSR renderiza no browser e simplifica operação de apps autenticados.
- SSR gera HTML por request e pode melhorar primeira resposta e indexação.
- prerender gera HTML no build para rotas conhecidas.
- abordagem híbrida escolhe por rota.

A escolha depende de SEO, personalização, latência, custo operacional e cache.

## Hydration

Hydration reaproveita o HTML entregue pelo servidor e conecta comportamento no cliente. Diferenças entre renderização de servidor e browser produzem mismatch.

Evite acessar `window`, `document`, `localStorage` ou dimensões de tela durante renderização universal sem verificar a plataforma e escolher o momento correto.

## TransferState

Dados carregados no servidor podem ser transferidos para evitar request duplicado no cliente. A estratégia precisa respeitar cache, privacidade e tamanho do HTML.

## Tooling

- Angular CLI concentra build, serve, test e generators;
- `angular.json` define targets, assets, styles e budgets;
- configurações de ambiente não devem carregar segredos;
- source maps de produção exigem política de publicação;
- CI deve executar lint, testes e build de produção.

## Diagnóstico

1. Reproduza com build e configuração equivalentes.
2. Leia erro de compilador antes de contorná-lo.
3. Isole se a falha está em template, DI, Router, rede ou rendering.
4. Use Angular DevTools e ferramentas do browser.
5. Registre causa e evidência da correção.

## Produção

Monitore erro, Web Vitals, navegação, requests e versão do bundle. Observabilidade precisa responder qual usuário foi afetado, em qual rota, por qual release e com qual dependência externa.

