import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LearningProgressService } from '../../../core/services/learning-progress.service';
import { COMPONENT_RECIPES } from '../../../features/component-catalog/component-recipes';
import { DOCUMENTATION_CHAPTERS } from '../../../features/documentation/documentation-chapters';
import { EXAMPLE_INDEX } from '../../../features/examples/example-index';
import { EXAM_INDEX } from '../../../features/assessments/exam-index';

interface NavItem {
  label: string;
  path: string;
  icon: string;
  badge?: () => string;
}

interface NavGroup {
  label: string;
  items: NavItem[];
}

@Component({
  selector: 'app-sidebar',
  imports: [RouterLink, RouterLinkActive, MatListModule, MatIconModule],
  templateUrl: './sidebar.html',
  styleUrl: './sidebar.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Sidebar {
  private readonly progressService = inject(LearningProgressService);

  readonly linkClick = output<void>();

  readonly overallProgress = this.progressService.overallProgress;
  readonly completedModules = this.progressService.completedModules;
  readonly totalModules = this.progressService.totalModules;

  readonly navGroups: NavGroup[] = [
    {
      label: 'Aprender',
      items: [
        { label: 'Visão geral', path: '/overview', icon: 'grid_view' },
        { label: 'Trilha Angular', path: '/learning', icon: 'school', badge: () => `${this.completedModules().length}/${this.totalModules}` },
        { label: 'Documentação', path: '/documentation', icon: 'menu_book', badge: () => String(DOCUMENTATION_CHAPTERS.length) },
      ],
    },
    {
      label: 'Praticar',
      items: [
        { label: 'Componentes', path: '/components', icon: 'widgets', badge: () => String(COMPONENT_RECIPES.length) },
        { label: 'Playground', path: '/examples', icon: 'code', badge: () => String(EXAMPLE_INDEX.length) },
        { label: 'Avaliações', path: '/assessments', icon: 'quiz', badge: () => String(EXAM_INDEX.length) },
      ],
    },
    {
      label: 'Evoluir',
      items: [
        { label: 'Meu progresso', path: '/reports', icon: 'assessment' },
      ],
    },
  ];
}
