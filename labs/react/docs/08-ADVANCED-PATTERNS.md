# Padrões avançados de composição

## APIs compostas

Prefira composição a dezenas de props booleanas. Compound components, slots explícitos e render props são ferramentas para criar APIs flexíveis.

```tsx
<Dialog>
  <Dialog.Trigger>Abrir</Dialog.Trigger>
  <Dialog.Content><ProfileForm /></Dialog.Content>
</Dialog>
```

## Controlled e uncontrolled

Um componente controlled recebe valor e callback; um uncontrolled mantém estado interno e pode aceitar `defaultValue`. Componentes reutilizáveis podem suportar ambos com um contrato inequívoco.

## Custom hooks

Hooks compartilham lógica, não estado. Cada chamada possui sua própria instância. O nome deve expressar a capacidade e o retorno deve ser pequeno e estável.

## Error boundaries

Isolam falhas de renderização em uma subárvore e oferecem fallback e recuperação. Não substituem tratamento de erros em eventos ou requests.

## Portals e overlays

Portals alteram a posição no DOM, não a árvore React: Context e propagação de eventos continuam seguindo a árvore React. Gerencie foco, escape, scroll lock e retorno ao gatilho.

## Exercício

Construa um Dialog acessível com API composta, portal, focus trap, fechamento por Escape e testes pelo comportamento.
