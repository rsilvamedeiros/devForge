# Ecossistema, manutenção e operações

## Escolhas conscientes

Uma dependência deve resolver um problema mensurável. Avalie manutenção, bundle, acessibilidade, tipagem, suporte a SSR e custo de migração.

## Design systems

Separe tokens, primitives e componentes de produto. Componentes compartilhados precisam de contrato estável, documentação, estados acessíveis e testes visuais quando o risco justificar.

## Monorepos

Workspaces simplificam compartilhamento, mas boundaries continuam necessários. Evite imports internos entre pacotes; publique contratos por exports explícitos.

## Upgrades

Leia release notes, execute codemods, atualize em passos pequenos e mantenha testes de comportamento. Deprecations são trabalho planejado, não surpresa para o próximo major.

## Debugging

1. Reproduza de forma mínima.
2. Observe props, estado, rede e commits no React DevTools.
3. Formule uma hipótese.
4. Altere uma variável.
5. Transforme a correção em teste ou monitoramento.

## Critério sênior

Não basta conhecer APIs: explique trade-offs, custo operacional, estratégia de migração e como a decisão será observada em produção.
