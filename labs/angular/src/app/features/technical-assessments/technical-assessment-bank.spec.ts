import { TECHNICAL_ASSESSMENTS, TECHNICAL_QUESTION_COUNT } from './technical-assessment-bank';

describe('Technical assessment bank', () => {
  it('provides quiz and mock formats for every seniority', () => {
    for (const level of ['Júnior','Pleno','Sênior']) {
      expect(TECHNICAL_ASSESSMENTS.some(pack => pack.level === level && pack.mode === 'quiz')).toBeTrue();
      expect(TECHNICAL_ASSESSMENTS.some(pack => pack.level === level && pack.mode === 'mock')).toBeTrue();
    }
  });

  it('keeps ids unique and all answers valid', () => {
    expect(new Set(TECHNICAL_ASSESSMENTS.map(pack => pack.id)).size).toBe(TECHNICAL_ASSESSMENTS.length);
    expect(TECHNICAL_QUESTION_COUNT).toBe(18);
    expect(TECHNICAL_ASSESSMENTS.every(pack => pack.questions.every(question => question.answer >= 0 && question.answer < question.options.length))).toBeTrue();
  });
});
