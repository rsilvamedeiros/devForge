import { ChangeDetectionStrategy, Component, computed, inject, output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { LearningProgressService } from '../../../core/services/learning-progress.service';
import { ThemeService } from '../../../core/services/theme.service';
import { EXAM_INDEX } from '../../../features/assessments/exam-index';
import { COMPONENT_RECIPES } from '../../../features/component-catalog/component-recipes';
import { DOCUMENTATION_CHAPTERS } from '../../../features/documentation/documentation-chapters';
import { EXAMPLE_INDEX } from '../../../features/examples/example-index';
import { ANGULAR_APIS, ANGULAR_AREAS } from '../../../core/data/angular-knowledge';
import { TECHNICAL_ASSESSMENTS } from '../../../features/technical-assessments/technical-assessment-bank';
import { TECHNICAL_QA } from '../../../features/knowledge-center/technical-qa.data';

interface SearchTarget {
  title: string;
  route: string;
}

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  private readonly router = inject(Router);
  private readonly progressService = inject(LearningProgressService);

  readonly theme = inject(ThemeService);
  readonly menuToggle = output<void>();
  readonly searchTerm = signal('');

  readonly nextModule = this.progressService.nextModule;
  readonly overallProgress = this.progressService.overallProgress;

  /** Busca no material de estudo — capítulos, receitas, exemplos e provas. */
  private readonly targets: SearchTarget[] = [
    ...DOCUMENTATION_CHAPTERS.map(chapter => ({ title: chapter.title, route: '/documentation' })),
    ...COMPONENT_RECIPES.map(recipe => ({ title: recipe.title, route: '/components' })),
    ...EXAMPLE_INDEX.map(example => ({ title: example.title, route: '/examples' })),
    ...EXAM_INDEX.map(exam => ({ title: exam.title, route: '/assessments' })),
    ...ANGULAR_AREAS.map(area => ({ title: area.title, route: '/curriculum' })),
    ...ANGULAR_APIS.map(api => ({ title: api.name, route: '/reference' })),
    ...TECHNICAL_ASSESSMENTS.map(item => ({ title: item.title, route: item.mode === 'quiz' ? '/technical-tests' : '/mock-exams' })),
    ...TECHNICAL_QA.map(item => ({ title: item.question, route: '/technical-qa' })),
    { title: 'Quiz rápido Angular', route: '/quick-quiz' },
  ];

  readonly matches = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    if (term.length < 2) return [];
    return this.targets.filter(target => target.title.toLowerCase().includes(term)).slice(0, 5);
  });

  search(event: Event): void {
    event.preventDefault();
    const first = this.matches()[0];
    if (!first) return;
    this.go(first);
  }

  go(target: SearchTarget): void {
    this.router.navigateByUrl(target.route);
    this.searchTerm.set('');
  }
}
