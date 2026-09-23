import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, computed, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { LearningProgressService } from '../../core/services/learning-progress.service';
import { EXAM_INDEX } from '../assessments/exam-index';
import { TECHNICAL_ASSESSMENTS } from '../technical-assessments/technical-assessment-bank';
import { TechnicalAssessmentService } from '../technical-assessments/technical-assessment.service';

@Component({
  selector: 'app-reports',
  imports: [DatePipe, MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './reports.html',
  styleUrl: './reports.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Reports {
  private readonly progressService = inject(LearningProgressService);
  private readonly technicalAssessmentService = inject(TechnicalAssessmentService);

  readonly overallProgress = this.progressService.overallProgress;
  readonly moduleProgress = this.progressService.moduleProgress;
  readonly examProgress = this.progressService.examProgress;
  readonly accuracy = this.progressService.accuracy;
  readonly answeredQuestions = this.progressService.answeredQuestions;
  readonly correctQuestions = this.progressService.correctQuestions;
  readonly evidence = this.progressService.evidence;
  readonly gaps = this.progressService.gaps;
  readonly modules = this.progressService.modules;

  readonly examRows = computed(() =>
    EXAM_INDEX.map(exam => {
      const result = this.progressService.resultFor(exam.id);
      return {
        id: exam.id,
        title: exam.title,
        result,
        percent: result ? Math.round((result.correct / result.total) * 100) : null,
        passed: this.progressService.isPassed(exam.id),
      };
    })
  );

  readonly technicalRows = computed(() =>
    TECHNICAL_ASSESSMENTS.map(assessment => ({
      ...assessment,
      result: this.technicalAssessmentService.resultFor(assessment.id),
    }))
  );

  /** Escala de domínio do DevForge (0–6) derivada da evidência registrada. */
  readonly masteryLevel = computed(() => {
    const progress = this.overallProgress();
    if (progress >= 100) return { level: 5, label: 'Justifico decisões e trade-offs' };
    if (progress >= 80) return { level: 4, label: 'Implemento sozinho' };
    if (progress >= 55) return { level: 3, label: 'Implemento consultando' };
    if (progress >= 30) return { level: 2, label: 'Consigo explicar' };
    if (progress > 0) return { level: 1, label: 'Conheço o conceito' };
    return { level: 0, label: 'Ainda sem evidência' };
  });

  moduleCompleted(id: string): boolean {
    return this.progressService.isModuleCompleted(id);
  }
}
