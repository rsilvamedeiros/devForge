# React — fundamentos e composição

## Renderização declarativa

Um componente é uma função pura da entrada para a UI. Render não deve enviar request, alterar storage ou mutar objetos externos.

```tsx
type BadgeProps = { status: TicketStatus };
function StatusBadge({ status }: BadgeProps) {
  return <span className={`status status--${status}`}>{labels[status]}</span>;
}
```

## JSX

JSX é sintaxe para criar elementos. Expressões entram com chaves; atributos seguem DOM/React; fragments evitam wrappers sem semântica. Nunca injete HTML não confiável.

## Props e composição

Props são somente leitura. Prefira composição, children e componentes especializados a dezenas de flags booleanas. Eleve estado apenas quando dois consumidores realmente compartilham ownership.

## Identidade

Tipo, posição e `key` determinam se React preserva estado. Keys devem vir do domínio. Trocar key força remount; isso pode ser útil para reset explícito, não como correção automática.

## Renderização condicional e listas

Modele loading, error, empty e success como estados distintos. Evite cadeias ternárias difíceis de ler. Em listas mutáveis, índice não é identidade.

## Eventos

Passe callbacks, não o resultado da chamada. Eventos são locais à árvore React; regras de domínio continuam testáveis fora do componente.
