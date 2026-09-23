# Testes Angular

## Estratégia

Teste o menor recorte que comprova o risco. Funções puras não precisam de `TestBed`; componentes, DI, Router e HttpClient precisam do runtime correspondente.

## Unidade

Use para transformações, validadores, reducers, entidades e regras. Esses testes devem ser rápidos e sem dependência de browser.

## Componentes

Interaja pela API pública e pelo DOM. Configure inputs, dispare eventos e verifique a saída observável. Evite testar métodos privados ou a ordem interna de chamadas sem relevância contratual.

```ts
const fixture = TestBed.createComponent(Counter);
fixture.componentRef.setInput('step', 2);
fixture.detectChanges();
fixture.nativeElement.querySelector('button').click();
expect(fixture.nativeElement.textContent).toContain('2');
```

## Harnesses

Component Harnesses oferecem uma API estável para interagir com componentes, especialmente Angular Material. Eles reduzem dependência de seletores e estrutura interna.

## HTTP

`provideHttpClientTesting()` e `HttpTestingController` permitem verificar request e responder sem rede. Sempre execute `verify()` no teardown.

## Router

`RouterTestingHarness` permite navegar por URLs reais, ativar guards/resolvers e inspecionar a página resultante.

## Doubles

- stub fornece resposta controlada;
- spy registra interação;
- fake implementa comportamento simplificado;
- mock combina expectativa e verificação.

Escolha o double pelo que o teste precisa provar. Excesso de spies costuma acoplar o teste à implementação.

## Qualidade do teste

- nome descreve comportamento;
- Arrange, Act e Assert são identificáveis;
- falha aponta o contrato quebrado;
- resultado é determinístico;
- nenhum timer, request ou assinatura fica pendente;
- refatoração interna não exige reescrever o teste.

