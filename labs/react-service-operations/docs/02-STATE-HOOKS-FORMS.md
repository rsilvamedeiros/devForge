# React — estado, hooks e formulários

## Estado mínimo

Armazene apenas o que muda e não pode ser calculado. Filtros aplicados, totais e labels geralmente são derivados durante render.

## Hooks

Hooks devem ser chamados no topo e sempre na mesma ordem. Custom hook compartilha lógica, não estado automaticamente.

- `useState`: interação local simples;
- `useReducer`: transições relacionadas ou estado complexo;
- `useRef`: valor mutável sem render ou referência DOM;
- `useContext`: dependência transversal estável;
- `useId`: associação acessível, não key de lista.

## Effects

`useEffect` sincroniza React com algo externo: network manual, DOM imperativo, subscription ou storage. Se um valor pode ser calculado na renderização ou em evento, não precisa de effect.

Sempre modele cleanup e dependências honestamente. Effects devem tolerar execução adicional em desenvolvimento.

## Formulários

Controlled input usa state como fonte de verdade; uncontrolled usa DOM/ref. Escolha por requisito. Validação deve produzir mensagens específicas, preservar dados e direcionar foco.

## Context

Context reduz prop drilling para tema, locale ou sessão. Valores que mudam frequentemente podem renderizar muitos consumidores; separe contexts por responsabilidade e estabilize apenas quando medido.

## Imutabilidade

Crie novos arrays/objetos ao atualizar. Mutação silenciosa quebra previsibilidade, memoização e histórico de estado.
