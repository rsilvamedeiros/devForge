import { TestBed } from '@angular/core/testing';
import { LearningProgressService } from './learning-progress.service';

describe('LearningProgressService', () => {
  let service: LearningProgressService;

  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({});
    service = TestBed.inject(LearningProgressService);
  });

  it('starts with no progress and every exam as a gap', () => {
    expect(service.overallProgress()).toBe(0);
    expect(service.gaps().length).toBe(service.totalExams);
    expect(service.nextModule()?.id).toBe(service.modules[0].id);
  });

  it('weighs modules and exams equally in the overall progress', () => {
    for (const module of service.modules) {
      service.toggleModule(module.id);
    }

    expect(service.moduleProgress()).toBe(100);
    expect(service.examProgress()).toBe(0);
    expect(service.overallProgress()).toBe(50);
  });

  it('counts an exam as passed only from 80%', () => {
    service.recordExam('fundamentals', { correct: 3, total: 5, takenAt: new Date().toISOString() });
    expect(service.isPassed('fundamentals')).toBe(false);

    service.recordExam('fundamentals', { correct: 4, total: 5, takenAt: new Date().toISOString() });
    expect(service.isPassed('fundamentals')).toBe(true);
  });

  it('keeps the best attempt instead of the latest', () => {
    service.recordExam('quality', { correct: 5, total: 5, takenAt: '2026-01-01T10:00:00.000Z' });
    service.recordExam('quality', { correct: 2, total: 5, takenAt: '2026-01-02T10:00:00.000Z' });

    expect(service.resultFor('quality')?.correct).toBe(5);
  });

  it('removes a passed exam from the gap list', () => {
    const before = service.gaps().length;
    service.recordExam('signals-rxjs', { correct: 5, total: 5, takenAt: new Date().toISOString() });

    expect(service.gaps().length).toBe(before - 1);
    expect(service.gaps().some(gap => gap.id === 'signals-rxjs')).toBe(false);
  });

  it('reports accuracy across every attempt', () => {
    service.recordExam('fundamentals', { correct: 4, total: 5, takenAt: new Date().toISOString() });
    service.recordExam('components', { correct: 3, total: 5, takenAt: new Date().toISOString() });

    expect(service.answeredQuestions()).toBe(10);
    expect(service.correctQuestions()).toBe(7);
    expect(service.accuracy()).toBe(70);
  });

  it('lists evidence newest first', () => {
    service.recordExam('fundamentals', { correct: 5, total: 5, takenAt: '2026-01-01T10:00:00.000Z' });
    service.recordExam('components', { correct: 5, total: 5, takenAt: '2026-02-01T10:00:00.000Z' });

    expect(service.evidence()[0].at).toBe('2026-02-01T10:00:00.000Z');
  });

  it('restores persisted progress on a new instance', () => {
    service.toggleModule('signals');
    service.recordExam('quality', { correct: 5, total: 5, takenAt: new Date().toISOString() });

    TestBed.resetTestingModule();
    TestBed.configureTestingModule({});
    const restored = TestBed.inject(LearningProgressService);

    expect(restored.isModuleCompleted('signals')).toBe(true);
    expect(restored.isPassed('quality')).toBe(true);
  });
});
