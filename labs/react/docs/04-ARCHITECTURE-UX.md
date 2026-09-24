# React — arquitetura e experiência

## Fronteiras por feature

Agrupe domínio, hooks, API e UI específicos. Componentes compartilhados devem ser genéricos de verdade. Evite pastas globais que escondem ownership.

```text
features/tickets/
├── api
├── components
├── hooks
├── model
└── tests
```

## Camadas

Componentes apresentam e capturam intenção. Hooks coordenam React e infraestrutura. Services/adapters conversam com sistemas externos. Funções de domínio permanecem puras quando possível.

## Acessibilidade

Use elementos nativos, ordem de foco, labels, headings, live regions e contraste. Modal precisa prender/restaurar foco; loading precisa contexto; ícone sozinho precisa nome acessível.

## Styling

CSS global, modules, CSS-in-JS e utilities têm trade-offs de escopo, runtime, bundle e padronização. Tokens separam decisão visual de componente. Tema deve preservar contraste e estados de foco.

## Design system

Comece com primitives comprovadas: button, input, field, dialog, feedback e layout. Documente variantes e estados. Não confunda biblioteca visual com arquitetura de negócio.

## Erros

Erros devem ser recuperáveis e acionáveis. Preserve contexto, ofereça retry quando seguro e registre diagnóstico sem exibir detalhes internos.
