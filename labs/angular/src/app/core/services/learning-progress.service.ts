import { computed, Injectable, signal } from '@angular/core';
import { EXAM_INDEX } from '../../features/assessments/exam-index';
import { LEARNING_MODULES } from '../../features/learning/learning-modules';

export interface ExamResult {
  correct: number;
  total: number;
  takenAt: string;
}

export interface EvidenceEntry {
  kind: 'module' | 'exam';
  label: string;
  detail: string;
  at: string;
}

const MODULES_KEY = 'equities-learning-progress';
const EXAMS_KEY = 'equities-exam-results';
export const PASS_RATIO = 0.8;

/**
 * Fonte única do progresso acadêmico. Trilha e provas gravavam cada uma no seu
 * localStorage; centralizar aqui evita que dashboard, trilha e relatórios
 * discordem sobre o mesmo estado.
 */
@Injectable({ providedIn: 'root' })
export class LearningProgressService {
  readonly completedModules = signal<string[]>(this.restore<string[]>(MODULES_KEY, []));
  readonly examResults = signal<Record<string, ExamResult>>(this.restore<Record<string, ExamResult>>(EXAMS_KEY, {}));

  readonly modules = LEARNING_MODULES;
  readonly totalModules = LEARNING_MODULES.length;
  readonly totalExams = EXAM_INDEX.length;

  readonly moduleProgress = computed(() =>
    Math.round((this.completedModules().length / this.totalModules) * 100)
  );

  readonly passedExams = computed(() =>
    EXAM_INDEX.filter(exam => this.isPassed(exam.id)).length
  );

  readonly examProgress = computed(() =>
    Math.round((this.passedExams() / this.totalExams) * 100)
  );

  /** Módulo concluído vale metade; prova aprovada vale a outra metade. */
  readonly overallProgress = computed(() =>
    Math.round((this.moduleProgress() + this.examProgress()) / 2)
  );

  readonly answeredQuestions = computed(() =>
    Object.values(this.examResults()).reduce((sum, result) => sum + result.total, 0)
  );

  readonly correctQuestions = computed(() =>
    Object.values(this.examResults()).reduce((sum, result) => sum + result.correct, 0)
  );

  readonly accuracy = computed(() => {
    const answered = this.answeredQuestions();
    return answered ? Math.round((this.correctQuestions() / answered) * 100) : 0;
  });

  readonly nextModule = computed(() =>
    this.modules.find(module => !this.completedModules().includes(module.id))
  );

  /** Provas ainda não aprovadas — a lacuna que o relatório precisa mostrar. */
  readonly gaps = computed(() =>
    EXAM_INDEX.filter(exam => !this.isPassed(exam.id)).map(exam => ({
      id: exam.id,
      title: exam.title,
      result: this.examResults()[exam.id],
    }))
  );

  readonly evidence = computed<EvidenceEntry[]>(() => {
    const entries: EvidenceEntry[] = [];

    for (const [examId, result] of Object.entries(this.examResults())) {
      const exam = EXAM_INDEX.find(item => item.id === examId);
      const ratio = result.correct / result.total;
      entries.push({
        kind: 'exam',
        label: exam?.title ?? examId,
        detail: `${result.correct}/${result.total} · ${ratio >= PASS_RATIO ? 'aprovado' : 'abaixo de 80%'}`,
        at: result.takenAt,
      });
    }

    return entries.sort((a, b) => b.at.localeCompare(a.at));
  });

  isModuleCompleted(id: string): boolean {
    return this.completedModules().includes(id);
  }

  isPassed(examId: string): boolean {
    const result = this.examResults()[examId];
    return !!result && result.correct / result.total >= PASS_RATIO;
  }

  resultFor(examId: string): ExamResult | undefined {
    return this.examResults()[examId];
  }

  toggleModule(id: string): void {
    this.completedModules.update(current =>
      current.includes(id) ? current.filter(item => item !== id) : [...current, id]
    );
    this.persist(MODULES_KEY, this.completedModules());
  }

  /** Só sobrescreve quando o novo resultado é igual ou melhor que o anterior. */
  recordExam(examId: string, result: ExamResult): void {
    const previous = this.examResults()[examId];
    if (previous && result.correct < previous.correct) return;

    this.examResults.update(current => ({ ...current, [examId]: result }));
    this.persist(EXAMS_KEY, this.examResults());
  }

  private persist(key: string, value: unknown): void {
    try { localStorage.setItem(key, JSON.stringify(value)); }
    catch { /* modo privado: o progresso vale apenas nesta sessão */ }
  }

  private restore<T>(key: string, fallback: T): T {
    try { return JSON.parse(localStorage.getItem(key) ?? 'null') as T ?? fallback; }
    catch { return fallback; }
  }
}
