import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface Ticker {
  id: number;
  symbol: string;
}

@Component({
  selector: 'app-track-demo',
  imports: [MatButtonModule, MatIconModule],
  template: `
    <div class="demo-actions">
      <button mat-stroked-button type="button" (click)="prepend()">Inserir no topo</button>
      <button mat-stroked-button type="button" (click)="shuffle()">Embaralhar</button>
    </div>
    <ul class="demo-list">
      @for (ticker of tickers(); track ticker.id) {
        <li>
          <span>{{ ticker.symbol }}</span>
          <input type="text" placeholder="anote algo aqui" />
          <button mat-icon-button type="button" (click)="remove(ticker.id)"><mat-icon>close</mat-icon></button>
        </li>
      }
    </ul>
    <p class="demo-note">Digite nos campos e reordene: o texto acompanha a linha porque <code>track ticker.id</code> preserva o DOM. Com <code>track $index</code> o texto ficaria para trás.</p>
  `,
  styles: `
    .demo-actions { display: flex; gap: .5rem; margin-bottom: .9rem; }
    .demo-list { display: grid; gap: .4rem; margin: 0; padding: 0; list-style: none; }
    .demo-list li { display: flex; align-items: center; gap: .6rem; padding: .4rem .6rem; border: 1px solid var(--trade-border); border-radius: 9px; }
    .demo-list span { min-width: 4rem; font-weight: 600; }
    .demo-list input { flex: 1; padding: .3rem .5rem; border: 1px solid var(--trade-border); border-radius: 6px; background: var(--trade-bg); color: inherit; font: inherit; font-size: .8rem; }
    .demo-note { margin: .9rem 0 0; color: var(--trade-muted); font-size: .8rem; }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackDemo {
  private nextId = 4;
  private readonly pool = ['PETR4', 'VALE3', 'ITUB4', 'WEGE3', 'B3SA3', 'MGLU3'];
  readonly tickers = signal<Ticker[]>([
    { id: 1, symbol: 'PETR4' },
    { id: 2, symbol: 'VALE3' },
    { id: 3, symbol: 'ITUB4' },
  ]);

  prepend(): void {
    const symbol = this.pool[this.nextId % this.pool.length];
    this.tickers.update(list => [{ id: this.nextId++, symbol }, ...list]);
  }

  shuffle(): void {
    this.tickers.update(list => [...list].reverse());
  }

  remove(id: number): void {
    this.tickers.update(list => list.filter(ticker => ticker.id !== id));
  }
}
