# TypeScript — design de bibliotecas

Uma biblioteca é um contrato consumido fora do controle do autor. Tipos públicos, JavaScript emitido e versionamento precisam evoluir juntos.

## API pública mínima

Exporte capacidades, não toda a estrutura interna.

```json
{
  "exports": {
    ".": { "types": "./dist/index.d.ts", "import": "./dist/index.js" },
    "./testing": { "types": "./dist/testing.d.ts", "import": "./dist/testing.js" }
  }
}
```

Subpath exports evitam deep imports acidentais.

## Declaration files

`declaration: true` gera `.d.ts`. Inspecione o resultado: tipos privados vazando, unions enormes e generics sem default pioram a experiência do consumidor.

## Tipos de entrada e saída

Aceite contratos amplos quando seguro e retorne tipos específicos. Evite boolean parameters e overloads ambíguos.

```ts
type ParseOptions = { strict?: boolean; locale?: string };
function parse(input: string, options: ParseOptions = {}): ParsedValue;
```

## Type tests

```ts
const value = parse('42');
value satisfies ParsedValue;
// @ts-expect-error entrada inválida deve continuar rejeitada
parse(42);
```

`@ts-expect-error` falha quando o erro deixa de existir, tornando regressões de contrato visíveis.

## SemVer e tipos

Alterar um tipo público pode quebrar consumidores mesmo sem mudar runtime. Considere breaking changes em parâmetros, propriedades readonly, unions e resolução de módulos.

## Performance do compilador

Conditional types recursivos e unions combinatórias afetam editor e CI. Meça diagnostics do compilador e prefira tipos nomeados e limites de recursão.

## Checklist de publicação

- ESM/CJS e `moduleResolution` estão claros?
- `exports` aponta para JavaScript e declarations existentes?
- O package inclui apenas arquivos necessários?
- Type tests cobrem inferência do consumidor?
- A documentação mostra imports públicos?
- Mudanças de tipo seguem SemVer?

