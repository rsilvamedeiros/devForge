# Handbook TypeScript

Referência do laboratório para dominar TypeScript além da sintaxe: modelagem, inferência, generics, runtime, configuração e arquitetura.

## Mapa

1. **Sistema de tipos e narrowing** — inferência, unions, guards, nullability e `never`.
2. **Funções, generics e transformação** — constraints, utility, conditional e mapped types.
3. **Objetos, classes e módulos** — structural typing, interfaces, POO, modules e boundaries.
4. **Async, erros e runtime** — Promise, unknown, validação, concorrência e interoperabilidade.
5. **Configuração e qualidade** — tsconfig, build, lint, testes, performance e arquitetura.

## Competência esperada

- modelar estados válidos e impedir combinações impossíveis;
- usar `unknown` e narrowing em fronteiras;
- escrever generic útil sem esconder intenção;
- diferenciar tipo estático de validação runtime;
- configurar strictness, modules e build;
- explicar structural typing, variance e limites da tipagem;
- projetar contratos testáveis para código assíncrono.

## Aplicação no lab

O Pulse Queue aplica unions, interfaces, generics, readonly, composição, DI, async/await, resultado discriminado, idempotência e testes. A control room usa os mesmos contratos no browser.
