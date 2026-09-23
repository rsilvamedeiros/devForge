import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLink } from '@angular/router';
import { LearningProgressService, PASS_RATIO } from '../../core/services/learning-progress.service';
import { EXAMS, Exam } from './question-bank';

@Component({
  selector: 'app-assessments',
  imports: [MatButtonModule, MatIconModule, MatProgressBarModule, RouterLink],
  templateUrl: './assessments.html',
  styleUrl: './assessments.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Assessments {
  private readonly progressService = inject(LearningProgressService);

  readonly exams = EXAMS;
  readonly active = signal<Exam | null>(null);
  readonly answers = signal<Record<string, number>>({});
  readonly submitted = signal(false);

  readonly totalQuestions = this.exams.reduce((sum, exam) => sum + exam.questions.length, 0);
  readonly passedCount = this.progressService.passedExams;

  readonly answeredCount = computed(() => Object.keys(this.answers()).length);
  readonly correctCount = computed(() => {
    const exam = this.active();
    if (!exam) return 0;
    return exam.questions.filter(question => this.answers()[question.id] === question.answer).length;
  });
  readonly scoreRatio = computed(() => {
    const exam = this.active();
    return exam ? this.correctCount() / exam.questions.length : 0;
  });
  readonly passed = computed(() => this.scoreRatio() >= PASS_RATIO);

  start(exam: Exam): void {
    this.active.set(exam);
    this.answers.set({});
    this.submitted.set(false);
  }

  choose(questionId: string, index: number): void {
    if (this.submitted()) return;
    this.answers.update(current => ({ ...current, [questionId]: index }));
  }

  submit(): void {
    const exam = this.active();
    if (!exam || this.answeredCount() < exam.questions.length) return;

    this.submitted.set(true);
    this.progressService.recordExam(exam.id, {
      correct: this.correctCount(),
      total: exam.questions.length,
      takenAt: new Date().toISOString(),
    });
  }

  retry(): void {
    this.answers.set({});
    this.submitted.set(false);
  }

  close(): void {
    this.active.set(null);
    this.answers.set({});
    this.submitted.set(false);
  }

  resultFor(examId: string) {
    return this.progressService.resultFor(examId);
  }

  isPassed(examId: string): boolean {
    return this.progressService.isPassed(examId);
  }
}
