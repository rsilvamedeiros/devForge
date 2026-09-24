# Angular — qualidade e arquitetura

## Testes

- funções/domínio: testes unitários sem Angular;
- services: dependências substituídas explicitamente;
- HTTP: controller de teste valida request e response;
- componentes: comportamento visível, inputs, outputs e acessibilidade;
- integração/E2E: fluxos críticos, não todas as combinações.

Evite testar detalhes privados ou repetir o template em asserts frágeis.

## Performance

Meça com DevTools e Angular DevTools. Principais alavancas: lazy loading, `@defer`, tracking correto, `OnPush`, Signals, redução de trabalho em template, imagens/bundles otimizados e virtualização para listas grandes.

Memoização e `OnPush` não corrigem algoritmos caros, estado duplicado ou requests redundantes.

## Arquitetura

Defina fronteiras por feature e direção de dependência. UI conhece casos de uso; domínio não precisa conhecer Material ou HttpClient. Use adapters quando uma integração deve ser substituível, como `PriceFeed`.

## Erros e observabilidade

Separe mensagem para usuário de diagnóstico técnico. Registre correlação, contexto e duração sem expor dados sensíveis. Error handler global é última barreira, não substituto para tratamento contextual.

## Entrevista

Consiga explicar: DI hierárquica, Signals versus RxJS, `OnPush`, lifecycle, reactive forms, guards/interceptors, lazy loading, testes e um gargalo real que você mediu.
