import { LitElement, css, html } from 'lit';

export class AcademyBadge extends LitElement {
  static override properties = { label: { type: String }, detail: { type: String } };
  declare label: string;
  declare detail: string;

  constructor() {
    super();
    this.label = 'TS';
    this.detail = 'strict';
  }

  static override styles = css`
    :host { display: inline-flex; }
    span { display: grid; min-width: 44px; height: 44px; padding: 0 8px; place-items: center; border: 1px solid #a99fff66; border-radius: 12px; color: #c9c2ff; background: linear-gradient(145deg,#2b2547,#19172a); font: 800 14px/1 ui-monospace,monospace; box-shadow: 0 8px 24px #6d5be32f; }
    small { display: none; }
  `;

  override render() { return html`<span title=${this.detail}><slot>${this.label}</slot><small>${this.detail}</small></span>`; }
}

customElements.define('academy-badge', AcademyBadge);

declare global {
  interface HTMLElementTagNameMap { 'academy-badge': AcademyBadge }
}
