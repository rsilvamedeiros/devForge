import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLink } from '@angular/router';
import { LearningProgressService } from '../../core/services/learning-progress.service';

@Component({
  selector: 'app-learning',
  imports: [MatButtonModule, MatIconModule, MatProgressBarModule, RouterLink],
  templateUrl: './learning.html',
  styleUrl: './learning.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Learning {
  private readonly progressService = inject(LearningProgressService);

  readonly modules = this.progressService.modules;
  readonly completed = this.progressService.completedModules;
  readonly progress = this.progressService.moduleProgress;
  readonly nextModule = this.progressService.nextModule;
  readonly query = signal('');
  readonly status = signal<'all' | 'pending' | 'completed'>('all');
  readonly visibleModules = computed(() => {
    const term = this.query().trim().toLowerCase();
    return this.modules.filter(module => {
      const done = this.completed().includes(module.id);
      const matchesStatus = this.status() === 'all' || (this.status() === 'completed' ? done : !done);
      const matchesQuery = !term || `${module.title} ${module.description} ${module.skills.join(' ')}`.toLowerCase().includes(term);
      return matchesStatus && matchesQuery;
    });
  });

  readonly exercises = [
    { level: 'Fundamento', title: 'Catálogo pesquisável', description: 'Combine busca, categoria e ordenação com computed.', icon: 'filter_alt' },
    { level: 'Aplicação', title: 'Formulário de matrícula', description: 'Modele validações tipadas e mensagens acessíveis.', icon: 'assignment' },
    { level: 'Aplicação', title: 'Stream de atividade', description: 'Consuma eventos com RxJS, trate erro e garanta cleanup.', icon: 'sensors' },
    { level: 'Arquitetura', title: 'Estado entre features', description: 'Defina ownership, fronteiras e persistência sem duplicar estado.', icon: 'account_tree' },
  ];

  toggle(id: string): void {
    this.progressService.toggleModule(id);
  }
}
