# Effects, refs e ciclo de sincronização

## Render não é lifecycle

React renderiza uma fotografia da interface. `useEffect` roda depois do commit para sincronizar um sistema externo: rede imperativa, DOM não React, timers ou subscriptions.

## Antes de criar um effect

1. O valor pode ser calculado durante o render? Derive diretamente.
2. A ação nasceu de um evento? Execute no handler.
3. É estado remoto? Prefira uma camada de server state.
4. Há realmente um sistema externo? Então use effect com cleanup simétrico.

```tsx
useEffect(() => {
  const connection = chat.connect(roomId);
  return () => connection.disconnect();
}, [roomId]);
```

## Refs

Refs guardam valores que não participam do render ou dão acesso controlado ao DOM. Alterar `ref.current` não renderiza novamente. Use para foco, medidas, integração imperativa e identificadores de timers.

## Stale closures

Cada callback captura o snapshot do render em que nasceu. Não omita dependências para “controlar” execução; redesenhe o fluxo, use updater functions ou extraia eventos quando apropriado.

## Exercício

Receba um componente com três effects de sincronização interna, remova os desnecessários e prove com testes que o comportamento permaneceu igual.
