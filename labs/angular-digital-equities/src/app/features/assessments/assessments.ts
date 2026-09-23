import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLink } from '@angular/router';
import { EXAMS, Exam } from './question-bank';

export interface ExamResult {
  correct: number;
  total: number;
  takenAt: string;
}

const STORAGE_KEY = 'equities-exam-results';
const PASS_RATIO = 0.8;

@Component({
  selector: 'app-assessments',
  imports: [MatButtonModule, MatIconModule, MatProgressBarModule, RouterLink],
  templateUrl: './assessments.html',
  styleUrl: './assessments.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Assessments {
  readonly exams = EXAMS;
  readonly results = signal<Record<string, ExamResult>>(this.restore());
  readonly active = signal<Exam | null>(null);
  readonly answers = signal<Record<string, number>>({});
  readonly submitted = signal(false);

  readonly totalQuestions = this.exams.reduce((sum, exam) => sum + exam.questions.length, 0);
  readonly passedCount = computed(
    () => Object.values(this.results()).filter(result => result.correct / result.total >= PASS_RATIO).length
  );

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
    const result: ExamResult = {
      correct: this.correctCount(),
      total: exam.questions.length,
      takenAt: new Date().toISOString(),
    };
    const previous = this.results()[exam.id];
    if (!previous || result.correct >= previous.correct) {
      this.results.update(current => ({ ...current, [exam.id]: result }));
      this.persist();
    }
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

  resultFor(examId: string): ExamResult | undefined {
    return this.results()[examId];
  }

  ratioFor(examId: string): number {
    const result = this.results()[examId];
    return result ? result.correct / result.total : 0;
  }

  isPassed(examId: string): boolean {
    return this.ratioFor(examId) >= PASS_RATIO;
  }

  private persist(): void {
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(this.results())); }
    catch { /* modo privado: o resultado segue válido apenas nesta sessão */ }
  }

  private restore(): Record<string, ExamResult> {
    try { return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '{}') as Record<string, ExamResult>; }
    catch { return {}; }
  }
}
