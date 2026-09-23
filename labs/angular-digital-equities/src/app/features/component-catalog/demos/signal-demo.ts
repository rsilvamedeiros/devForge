import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-signal-demo',
  imports: [MatButtonModule],
  template: `
    <div class="demo-row">
      <button mat-stroked-button type="button" (click)="remove()">−</button>
      <strong>{{ quantity() }}</strong>
      <button mat-stroked-button type="button" (click)="add()">+</button>
    </div>
    <p class="demo-note">Preço unitário R$ {{ price }} · Total <strong>R$ {{ total() }}</strong></p>
    <p class="demo-note">O total nunca é armazenado: ele é derivado a cada mudança de quantidade.</p>
  `,
  styles: `
    .demo-row { display: flex; align-items: center; gap: 1rem; }
    .demo-row strong { min-width: 2rem; text-align: center; font-size: 1.4rem; }
    .demo-note { margin: .75rem 0 0; color: var(--trade-muted); font-size: .8rem; }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalDemo {
  readonly price = 38.42;
  readonly quantity = signal(100);
  readonly total = computed(() => (this.quantity() * this.price).toFixed(2));

  add(): void { this.quantity.update(value => value + 100); }
  remove(): void { this.quantity.update(value => Math.max(0, value - 100)); }
}
