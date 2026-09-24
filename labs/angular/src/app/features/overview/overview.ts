import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { LearningProgressService } from '../../core/services/learning-progress.service';
import { EXAM_INDEX } from '../assessments/exam-index';
import { DOCUMENTATION_CHAPTERS } from '../documentation/documentation-chapters';
import { EXAMPLE_INDEX } from '../examples/example-index';

@Component({
  selector: 'app-overview',
  imports: [MatIconModule, MatButtonModule, RouterLink],
  templateUrl: './overview.html',
  styleUrl: './overview.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Overview {
  private readonly progressService = inject(LearningProgressService);

  readonly overallProgress = this.progressService.overallProgress;
  readonly moduleProgress = this.progressService.moduleProgress;
  readonly examProgress = this.progressService.examProgress;
  readonly accuracy = this.progressService.accuracy;
  readonly passedExams = this.progressService.passedExams;
  readonly totalExams = this.progressService.totalExams;
  readonly totalModules = this.progressService.totalModules;
  readonly completedModules = this.progressService.completedModules;
  readonly answeredQuestions = this.progressService.answeredQuestions;
  readonly nextModule = this.progressService.nextModule;
  readonly gaps = this.progressService.gaps;
  readonly evidence = this.progressService.evidence;
  readonly modules = this.progressService.modules;

  readonly chapters = DOCUMENTATION_CHAPTERS.length;
  readonly examples = EXAMPLE_INDEX.length;

  /** Nota de cada prova para o gráfico de barras. */
  readonly examScores = computed(() =>
    EXAM_INDEX.map(exam => {
      const result = this.progressService.resultFor(exam.id);
      return {
        id: exam.id,
        title: exam.title,
        percent: result ? Math.round((result.correct / result.total) * 100) : 0,
        taken: !!result,
        passed: this.progressService.isPassed(exam.id),
      };
    })
  );

  readonly stats = computed(() => [
    { label: 'Progresso geral', value: `${this.overallProgress()}%`, icon: 'trending_up', hint: 'Trilha + provas' },
    { label: 'Módulos concluídos', value: `${this.completedModules().length}/${this.totalModules}`, icon: 'school', hint: 'Trilha Angular' },
    { label: 'Provas aprovadas', value: `${this.passedExams()}/${this.totalExams}`, icon: 'verified', hint: 'Mínimo de 80%' },
    { label: 'Aproveitamento', value: this.answeredQuestions() ? `${this.accuracy()}%` : '—', icon: 'target', hint: `${this.answeredQuestions()} questões respondidas` },
  ]);

  moduleCompleted(id: string): boolean {
    return this.progressService.isModuleCompleted(id);
  }
}
