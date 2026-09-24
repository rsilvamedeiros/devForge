# Handbook TypeScript

Referência do laboratório para dominar TypeScript além da sintaxe: modelagem, inferência, generics, runtime, configuração e arquitetura.

## Mapa

1. **Sistema de tipos e narrowing** — inferência, unions, guards, nullability e `never`.
2. **Funções, generics e transformação** — constraints, utility, conditional e mapped types.
3. **Objetos, classes e módulos** — structural typing, interfaces, POO, modules e boundaries.
4. **Async, erros e runtime** — Promise, unknown, validação, concorrência e interoperabilidade.
5. **Configuração e qualidade** — tsconfig, build, lint, testes, performance e arquitetura.
6. **Tipos avançados** — indexed access, conditional, infer, mapped e template literals.
7. **Runtime e domínio** — parsers, Result, brands, invariantes e DTOs.
8. **Metaprogramação e UI** — decorators, Lit, Web Components e eventos.
9. **Bibliotecas e testes de tipos** — declarations, exports, SemVer e compile-time assertions.
10. **Arquitetura** — boundaries, concorrência, ownership e evolução de contratos.

## Competência esperada

- modelar estados válidos e impedir combinações impossíveis;
- usar `unknown` e narrowing em fronteiras;
- escrever generic útil sem esconder intenção;
- diferenciar tipo estático de validação runtime;
- configurar strictness, modules e build;
- explicar structural typing, variance e limites da tipagem;
- projetar contratos testáveis para código assíncrono.

## Estratégia de estudo

Use os capítulos 01–05 para construir o modelo mental, 06–10 para recursos modernos e 11–16 para decisões profissionais. Depois resolva os Type Challenges no navegador e os 18 exercícios escritos.

## Aplicação no lab

A TypeScript Academy usa Lit para expor contratos no navegador. O Pulse Queue permanece como estudo de caso de unions, generics, readonly, composição, async, idempotência e testes.
