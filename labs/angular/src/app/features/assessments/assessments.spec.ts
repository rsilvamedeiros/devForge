import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { Assessments } from './assessments';
import { EXAM_INDEX } from './exam-index';
import { EXAMS } from './question-bank';

describe('Assessments', () => {
  beforeEach(() => {
    localStorage.clear();
    TestBed.configureTestingModule({ imports: [Assessments], providers: [provideRouter([])] });
  });

  it('keeps the lightweight sidebar index in sync with the question bank', () => {
    expect(EXAM_INDEX.length).toBe(EXAMS.length);
    expect(EXAM_INDEX.map(entry => entry.id)).toEqual(EXAMS.map(exam => exam.id));
  });

  it('has a valid answer index for every question', () => {
    for (const exam of EXAMS) {
      for (const question of exam.questions) {
        expect(question.answer).toBeGreaterThanOrEqual(0);
        expect(question.answer).toBeLessThan(question.options.length);
        expect(question.explanation.length).toBeGreaterThan(20);
      }
    }
  });

  it('only records a result after every question is answered', () => {
    const component = TestBed.createComponent(Assessments).componentInstance;
    const exam = EXAMS[0];

    component.start(exam);
    component.choose(exam.questions[0].id, exam.questions[0].answer);
    component.submit();

    expect(component.submitted()).toBe(false);
    expect(component.resultFor(exam.id)).toBeUndefined();
  });

  it('scores a fully answered exam and persists the result', () => {
    const component = TestBed.createComponent(Assessments).componentInstance;
    const exam = EXAMS[0];

    component.start(exam);
    for (const question of exam.questions) {
      component.choose(question.id, question.answer);
    }
    component.submit();

    expect(component.submitted()).toBe(true);
    expect(component.correctCount()).toBe(exam.questions.length);
    expect(component.passed()).toBe(true);
    expect(localStorage.getItem('equities-exam-results')).toContain(exam.id);
  });
});
