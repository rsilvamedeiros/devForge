import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-stream-demo',
  imports: [MatIconModule],
  template: `
    <div class="demo-price">
      <div>
        <span>PETR4</span>
        <strong>R$ {{ price().toFixed(2) }}</strong>
      </div>
      <span class="demo-change" [class.is-up]="variation() >= 0" [class.is-down]="variation() < 0">
        <mat-icon>{{ variation() >= 0 ? 'trending_up' : 'trending_down' }}</mat-icon>
        {{ variation().toFixed(2) }}%
      </span>
    </div>
    <p class="demo-note">Um <code>interval</code> do RxJS vira signal com <code>toSignal</code>. O template lê valor síncrono e o unsubscribe acontece quando o componente é destruído.</p>
  `,
  styles: `
    .demo-price { display: flex; align-items: center; justify-content: space-between; padding: 1rem; border: 1px solid var(--trade-border); border-radius: 11px; background: var(--trade-bg); }
    .demo-price span { color: var(--trade-muted); font-size: .75rem; }
    .demo-price strong { display: block; font-size: 1.5rem; }
    .demo-change { display: flex; align-items: center; gap: .25rem; font-weight: 700; }
    .demo-change mat-icon { width: 1.1rem; height: 1.1rem; font-size: 1.1rem; }
    .demo-change.is-up { color: var(--trade-positive); }
    .demo-change.is-down { color: var(--trade-negative); }
    .demo-note { margin: .9rem 0 0; color: var(--trade-muted); font-size: .8rem; }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StreamDemo {
  private readonly base = 38.42;
  private readonly seed = signal(this.base);

  readonly price = toSignal(
    interval(1500).pipe(map(() => this.nextPrice())),
    { initialValue: this.base }
  );

  readonly variation = computed(() => ((this.price() - this.base) / this.base) * 100);

  private nextPrice(): number {
    const jitter = this.seed() * 0.012 * (Math.random() * 2 - 1);
    const next = Number(Math.max(0.01, this.seed() + jitter).toFixed(2));
    this.seed.set(next);
    return next;
  }
}
