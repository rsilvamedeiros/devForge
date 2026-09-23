# Handbook Angular

Referência do laboratório para estudar Angular moderno do modelo mental à arquitetura. Leia os capítulos em ordem na primeira passagem; depois use-os por assunto.

## Mapa

1. **Fundamentos e plataforma** — bootstrap, standalone, estrutura, TypeScript e ciclo de renderização.
2. **Componentes e templates** — composição, bindings, control flow, queries e lifecycle.
3. **DI, dados e navegação** — providers, services, forms, Router, HttpClient e interceptors.
4. **Signals, RxJS e estado** — reatividade síncrona, streams, interoperabilidade e ownership.
5. **Qualidade e arquitetura** — testes, performance, acessibilidade, segurança e organização.

## Competência esperada

Ao terminar, você deve conseguir:

- criar uma feature standalone e carregá-la por rota;
- decidir entre input, service, Signal e Observable;
- construir formulário tipado e mapear DTO para domínio;
- controlar subscriptions e efeitos colaterais;
- explicar change detection, `OnPush`, tracking e lazy loading;
- testar componentes, services, HTTP e código assíncrono;
- identificar riscos de XSS, estado global excessivo e acoplamento.

## Aplicação no lab

O Angular Learning Lab usa standalone components, Angular Material, Signals, Reactive Forms, HttpClient, RxJS, lazy routes e `OnPush`. Procure cada conceito no código, observe as demonstrações e execute os exercícios relacionados.

## Limite

Este handbook cobre o núcleo necessário para aplicações Angular profissionais. Recursos muito especializados devem ser consultados na documentação oficial e adicionados aqui quando forem usados ou exigidos por uma vaga.
