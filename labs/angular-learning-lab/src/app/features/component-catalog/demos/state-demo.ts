import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

type ViewState = 'loading' | 'error' | 'empty' | 'ready';

@Component({
  selector: 'app-state-demo',
  imports: [MatButtonModule, MatProgressSpinnerModule],
  template: `
    <div class="demo-actions">
      @for (option of states; track option) {
        <button mat-stroked-button type="button" [class.is-active]="state() === option" (click)="state.set(option)">
          {{ option }}
        </button>
      }
    </div>

    <div class="demo-stage">
      @if (state() === 'loading') {
        <div class="demo-state"><mat-spinner diameter="28" /><span>Carregando aulas...</span></div>
      } @else if (state() === 'error') {
        <div class="demo-state is-error">
          <span>Falha ao carregar aulas.</span>
          <button mat-flat-button color="primary" type="button" (click)="state.set('ready')">Tentar novamente</button>
        </div>
      } @else if (state() === 'empty') {
        <div class="demo-state"><span>Nenhuma aula encontrada para esse filtro.</span></div>
      } @else {
        <ul class="demo-rows">
          @for (row of rows; track row) { <li>{{ row }}</li> }
        </ul>
      }
    </div>

    <p class="demo-note">Os quatro estados são exclusivos por construção: a cadeia <code>&#64;if / &#64;else if / &#64;else</code> torna impossível renderizar dois ao mesmo tempo.</p>
  `,
  styles: `
    .demo-actions { display: flex; flex-wrap: wrap; gap: .4rem; margin-bottom: .9rem; }
    .demo-actions .is-active { border-color: var(--lab-primary); color: var(--lab-primary); }
    .demo-stage { min-height: 116px; padding: 1rem; border: 1px solid var(--lab-border); border-radius: 11px; background: var(--lab-bg); }
    .demo-state { display: flex; align-items: center; gap: .75rem; color: var(--lab-muted); font-size: .85rem; }
    .demo-state.is-error { color: var(--lab-negative); }
    .demo-rows { display: grid; gap: .3rem; margin: 0; padding: 0; list-style: none; font-size: .85rem; }
    .demo-note { margin: .9rem 0 0; color: var(--lab-muted); font-size: .8rem; }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StateDemo {
  readonly states: ViewState[] = ['loading', 'error', 'empty', 'ready'];
  readonly state = signal<ViewState>('loading');
  readonly rows = ['PETR4 · R$ 38,42', 'VALE3 · R$ 61,15', 'ITUB4 · R$ 34,87'];
}
