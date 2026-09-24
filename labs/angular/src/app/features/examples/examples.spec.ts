import { TestBed } from '@angular/core/testing';
import { CODE_EXAMPLES } from './code-examples';
import { EXAMPLE_INDEX } from './example-index';
import { Examples } from './examples';

describe('Examples', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [Examples] });
  });

  it('keeps the lightweight sidebar index in sync with the examples', () => {
    expect(EXAMPLE_INDEX.length).toBe(CODE_EXAMPLES.length);
    expect(EXAMPLE_INDEX.map(entry => entry.id)).toEqual(CODE_EXAMPLES.map(example => example.id));
  });

  it('ships reference code that produces the documented output', () => {
    const component = TestBed.createComponent(Examples).componentInstance;

    for (const example of CODE_EXAMPLES) {
      component.open(example);
      component.run();

      const outcome = component.outcome();
      expect(outcome?.ok)
        .withContext(`exemplo "${example.id}" falhou ao executar`)
        .toBe(true);
      expect(outcome?.matchesExpected)
        .withContext(`exemplo "${example.id}" não bate com a saída de referência`)
        .toBe(true);
    }
  });

  it('reports a runtime error instead of throwing', () => {
    const component = TestBed.createComponent(Examples).componentInstance;

    component.draft.set('function solve() { throw new Error("boom"); }');
    component.run();

    expect(component.outcome()?.ok).toBe(false);
    expect(component.outcome()?.output).toContain('boom');
  });

  it('rejects code that does not define solve', () => {
    const component = TestBed.createComponent(Examples).componentInstance;

    component.draft.set('const x = 1;');
    component.run();

    expect(component.outcome()?.ok).toBe(false);
  });
});
