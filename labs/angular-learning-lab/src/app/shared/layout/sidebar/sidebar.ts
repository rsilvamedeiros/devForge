import { ChangeDetectionStrategy, Component, inject, output } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { LearningProgressService } from '../../../core/services/learning-progress.service';
import { COMPONENT_RECIPES } from '../../../features/component-catalog/component-recipes';
import { DOCUMENTATION_CHAPTERS } from '../../../features/documentation/documentation-chapters';
import { EXAMPLE_INDEX } from '../../../features/examples/example-index';
import { EXAM_INDEX } from '../../../features/assessments/exam-index';
import { ANGULAR_APIS, ANGULAR_AREAS } from '../../../core/data/angular-knowledge';
import { TECHNICAL_ASSESSMENTS } from '../../../features/technical-assessments/technical-assessment-bank';
import { TECHNICAL_QA } from '../../../features/knowledge-center/technical-qa.data';
import { CODING_CHALLENGES } from '../../../features/coding-arena/coding-challenges';
import { CAPSTONE_SPRINTS } from '../../../features/capstone-project/capstone-project.data';

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
      label: 'Início',
      items: [
        { label: 'Visão geral', path: '/overview', icon: 'grid_view' },
      ],
    },
    {
      label: 'Formação',
      items: [
        { label: 'Trilha Angular', path: '/learning', icon: 'school', badge: () => `${this.completedModules().length}/${this.totalModules}` },
        { label: 'Documentação', path: '/documentation', icon: 'menu_book', badge: () => String(DOCUMENTATION_CHAPTERS.length) },
        { label: 'Mapa Angular', path: '/curriculum', icon: 'map', badge: () => String(ANGULAR_AREAS.length) },
      ],
    },
    {
      label: 'Referência',
      items: [
        { label: 'APIs essenciais', path: '/reference', icon: 'api', badge: () => String(ANGULAR_APIS.length) },
        { label: 'Componentes', path: '/components', icon: 'widgets', badge: () => String(COMPONENT_RECIPES.length) },
        { label: 'Arquitetura', path: '/architecture', icon: 'architecture' },
      ],
    },
    {
      label: 'Praticar',
      items: [
        { label: 'Coding Arena', path: '/coding-arena', icon: 'terminal', badge: () => String(CODING_CHALLENGES.length) },
        { label: 'Playground', path: '/examples', icon: 'code', badge: () => String(EXAMPLE_INDEX.length) },
        { label: 'Testing lab', path: '/testing', icon: 'science', badge: () => '5' },
      ],
    },
    {
      label: 'Avaliar',
      items: [
        { label: 'Perguntas técnicas', path: '/technical-qa', icon: 'forum', badge: () => String(TECHNICAL_QA.length) },
        { label: 'Quiz rápido', path: '/quick-quiz', icon: 'bolt', badge: () => '10' },
        { label: 'Testes técnicos', path: '/technical-tests', icon: 'task', badge: () => String(TECHNICAL_ASSESSMENTS.filter(item => item.mode === 'quiz').length) },
        { label: 'Simulados', path: '/mock-exams', icon: 'timer', badge: () => String(TECHNICAL_ASSESSMENTS.filter(item => item.mode === 'mock').length) },
        { label: 'Provas por tema', path: '/assessments', icon: 'quiz', badge: () => String(EXAM_INDEX.length) },
      ],
    },
    {
      label: 'Evoluir',
      items: [
        { label: 'Projeto Final', path: '/capstone', icon: 'workspace_premium', badge: () => String(CAPSTONE_SPRINTS.length) },
        { label: 'Meu progresso', path: '/reports', icon: 'assessment' },
      ],
    },
  ];
}
