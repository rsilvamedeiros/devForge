# tsconfig profissional

`tsconfig.json` define a linguagem aceita, a resolução dos módulos e o rigor do contrato. Trate-o como parte da arquitetura.

## Base recomendada

```json
{
  "compilerOptions": {
    "target": "ES2022",
    "module": "NodeNext",
    "moduleResolution": "NodeNext",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "exactOptionalPropertyTypes": true,
    "noImplicitOverride": true,
    "verbatimModuleSyntax": true
  }
}
```

## Flags importantes

- `strict`: ativa a família principal de verificações;
- `noUncheckedIndexedAccess`: adiciona undefined a acesso por índice;
- `exactOptionalPropertyTypes`: diferencia ausência de undefined explícito;
- `useUnknownInCatchVariables`: torna erros capturados unknown;
- `noImplicitOverride`: exige intenção ao sobrescrever;
- `noFallthroughCasesInSwitch`: evita queda acidental entre cases.

## Module resolution

Escolha `NodeNext` para packages executados pelo Node moderno e `Bundler` para aplicações resolvidas por Vite/esbuild. Não misture suposições de runtime.

## Project references

Monorepos grandes podem usar `composite` e `references` para construir grafos incrementais e impedir imports cruzando boundaries.

## noEmit

Quando o bundler gera JavaScript, `tsc --noEmit` funciona como verificador. Para bibliotecas, configure declarations e inspecione os `.d.ts` emitidos.

## Performance

Use `tsc --extendedDiagnostics` para medir. Unions combinatórias, tipos condicionais recursivos e arquivos globais amplos podem degradar editor e CI.

