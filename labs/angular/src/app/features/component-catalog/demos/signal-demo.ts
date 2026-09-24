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
    <p class="demo-note">{{ lessonMinutes }} min por aula · Carga total <strong>{{ totalMinutes() }} min</strong></p>
    <p class="demo-note">A carga total nunca é armazenada: ela é derivada a cada mudança.</p>
  `,
  styles: `
    .demo-row { display: flex; align-items: center; gap: 1rem; }
    .demo-row strong { min-width: 2rem; text-align: center; font-size: 1.4rem; }
    .demo-note { margin: .75rem 0 0; color: var(--lab-muted); font-size: .8rem; }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignalDemo {
  readonly lessonMinutes = 25;
  readonly quantity = signal(4);
  readonly totalMinutes = computed(() => this.quantity() * this.lessonMinutes);

  add(): void { this.quantity.update(value => value + 1); }
  remove(): void { this.quantity.update(value => Math.max(0, value - 1)); }
}
