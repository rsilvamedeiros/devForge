# Context e estado global

## O problema é ownership

Antes de escolher uma biblioteca, defina quem lê, quem escreve, por quanto tempo o dado vive e se deve sobreviver à URL ou ao reload.

| Estado | Casa provável |
|---|---|
| interação de um componente | `useState` |
| fluxo complexo local | `useReducer` |
| preferência transversal estável | Context |
| filtro compartilhável | URL |
| dado vindo do backend | server-state cache |
| store externo com muitas assinaturas | `useSyncExternalStore` |

## Context não é um store gratuito

Quando o `value` muda, consumidores são notificados. Separe contextos por frequência e responsabilidade, estabilize contratos e evite expor um objeto global mutável.

```tsx
const ThemeContext = createContext<ThemeContextValue | null>(null);
```

## Reducer

Reducers tornam transições explícitas quando muitos eventos alteram o mesmo estado. A action descreve o que ocorreu; o reducer continua puro.

## Evidência

Compare estado elevado, Context e store externo para o mesmo requisito. Documente renderizações, ergonomia, testabilidade e custo de manutenção.
