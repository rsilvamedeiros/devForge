import { TECHNICAL_QUESTIONS } from '../technical-assessments/technical-assessment-bank';
import { TECHNICAL_QA } from './technical-qa.data';

describe('Knowledge center content', () => {
  it('offers discursive questions across every seniority', () => {
    expect(TECHNICAL_QA.length).toBeGreaterThanOrEqual(12);
    expect(new Set(TECHNICAL_QA.map(item => item.level))).toEqual(new Set(['Júnior', 'Pleno', 'Sênior']));
    expect(TECHNICAL_QA.every(item => item.answer.length > 80 && item.points.length >= 3)).toBeTrue();
  });

  it('exports a valid pool for immediate-feedback quizzes', () => {
    expect(TECHNICAL_QUESTIONS.length).toBe(18);
    expect(TECHNICAL_QUESTIONS.every(item => item.answer >= 0 && item.answer < item.options.length)).toBeTrue();
  });
});
