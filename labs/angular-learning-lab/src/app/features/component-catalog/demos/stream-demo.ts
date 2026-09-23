import { ChangeDetectionStrategy, Component } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatIconModule } from '@angular/material/icon';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-stream-demo',
  imports: [MatIconModule],
  template: `
    <div class="demo-price">
      <div>
        <span>Sessão de estudo</span>
        <strong>{{ elapsed() }} s</strong>
      </div>
      <span class="demo-change is-up">
        <mat-icon>radio_button_checked</mat-icon>
        em andamento
      </span>
    </div>
    <p class="demo-note">Um <code>interval</code> do RxJS vira signal com <code>toSignal</code>. O template lê um valor síncrono e o unsubscribe acontece quando o componente é destruído.</p>
  `,
  styles: `
    .demo-price { display: flex; align-items: center; justify-content: space-between; padding: 1rem; border: 1px solid var(--lab-border); border-radius: 11px; background: var(--lab-bg); }
    .demo-price span { color: var(--lab-muted); font-size: .75rem; }
    .demo-price strong { display: block; font-size: 1.5rem; }
    .demo-change { display: flex; align-items: center; gap: .25rem; font-weight: 700; }
    .demo-change mat-icon { width: 1.1rem; height: 1.1rem; font-size: 1.1rem; }
    .demo-change.is-up { color: var(--lab-positive); }
    .demo-change.is-down { color: var(--lab-negative); }
    .demo-note { margin: .9rem 0 0; color: var(--lab-muted); font-size: .8rem; }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StreamDemo {
  readonly elapsed = toSignal(
    interval(1000).pipe(map(value => value + 1)),
    { initialValue: 0 }
  );
}
