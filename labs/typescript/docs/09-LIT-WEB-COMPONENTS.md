# TypeScript com Lit e Web Components

Lit oferece templates declarativos e propriedades reativas sobre Custom Elements nativos. Nesta Academy ele torna TypeScript visível na interface sem impor um framework de aplicação completo.

## Componente tipado

```ts
import { LitElement, html } from 'lit';

class CourseBadge extends LitElement {
  static properties = { level: { type: String } };
  declare level: 'basic' | 'advanced';

  constructor() {
    super();
    this.level = 'basic';
  }

  override render() {
    return html`<span>${this.level}</span>`;
  }
}

customElements.define('course-badge', CourseBadge);
```

`declare` informa o contrato sem emitir um campo que interfira no sistema reativo.

## Propriedade ou atributo

Atributos são strings no HTML; propriedades podem carregar valores ricos. Lit converte tipos básicos, mas objetos devem ser passados como propriedades.

## Eventos tipados

```ts
this.dispatchEvent(new CustomEvent<Course>('course-selected', {
  detail: course,
  bubbles: true,
  composed: true
}));
```

`composed` permite atravessar Shadow DOM. Documente nome, payload e política de propagação.

## Shadow DOM

O encapsulamento evita vazamento de estilos. Design tokens via CSS custom properties atravessam a boundary e são preferíveis a seletores internos.

## Lifecycle

- `connectedCallback`: ligação ao DOM;
- `willUpdate`: preparar valores derivados;
- `updated`: integração pós-render;
- `disconnectedCallback`: remover subscriptions;
- `render`: descrição pura do template.

## Lit não substitui TypeScript

Generics, unions, parsing, módulos e arquitetura continuam independentes da camada visual. O objetivo é praticar esses contratos em componentes reais.

