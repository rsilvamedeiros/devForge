import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { ANGULAR_APIS } from '../../core/data/angular-knowledge';

@Component({
  selector: 'app-api-reference',
  imports: [MatIconModule],
  templateUrl: './api-reference.html',
  styleUrl: './api-reference.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApiReference {
  readonly query = signal('');
  readonly activeKind = signal('Todas');
  readonly kinds = ['Todas', ...new Set(ANGULAR_APIS.map(item => item.kind))];
  readonly selected = signal(ANGULAR_APIS[0]);

  readonly filtered = computed(() => {
    const term = this.query().trim().toLowerCase();
    return ANGULAR_APIS.filter(item =>
      (this.activeKind() === 'Todas' || item.kind === this.activeKind()) &&
      (!term || `${item.name} ${item.summary} ${item.useWhen}`.toLowerCase().includes(term))
    );
  });
}

