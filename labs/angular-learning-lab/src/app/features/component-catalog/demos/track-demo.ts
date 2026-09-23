import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';

interface Topic {
  id: number;
  title: string;
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
      @for (topic of topics(); track topic.id) {
        <li>
          <span>{{ topic.title }}</span>
          <input type="text" placeholder="anote algo aqui" />
          <button mat-icon-button type="button" (click)="remove(topic.id)"><mat-icon>close</mat-icon></button>
        </li>
      }
    </ul>
    <p class="demo-note">Digite nos campos e reordene: o texto acompanha a linha porque <code>track topic.id</code> preserva o DOM. Com <code>track $index</code> o texto ficaria para trás.</p>
  `,
  styles: `
    .demo-actions { display: flex; gap: .5rem; margin-bottom: .9rem; }
    .demo-list { display: grid; gap: .4rem; margin: 0; padding: 0; list-style: none; }
    .demo-list li { display: flex; align-items: center; gap: .6rem; padding: .4rem .6rem; border: 1px solid var(--lab-border); border-radius: 9px; }
    .demo-list span { min-width: 6rem; font-weight: 600; }
    .demo-list input { flex: 1; padding: .3rem .5rem; border: 1px solid var(--lab-border); border-radius: 6px; background: var(--lab-bg); color: inherit; font: inherit; font-size: .8rem; }
    .demo-note { margin: .9rem 0 0; color: var(--lab-muted); font-size: .8rem; }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TrackDemo {
  private nextId = 4;
  private readonly pool = ['Templates', 'Signals', 'RxJS', 'Router', 'Forms', 'Testes'];
  readonly topics = signal<Topic[]>([
    { id: 1, title: 'Componentes' },
    { id: 2, title: 'Templates' },
    { id: 3, title: 'Signals' },
  ]);

  prepend(): void {
    const title = this.pool[this.nextId % this.pool.length];
    this.topics.update(list => [{ id: this.nextId++, title }, ...list]);
  }

  shuffle(): void {
    this.topics.update(list => [...list].reverse());
  }

  remove(id: number): void {
    this.topics.update(list => list.filter(topic => topic.id !== id));
  }
}
