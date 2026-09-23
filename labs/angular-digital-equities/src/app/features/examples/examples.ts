import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { CodeEditor } from './code-editor';
import { CODE_EXAMPLES, CodeExample } from './code-examples';

interface RunOutcome {
  ok: boolean;
  output: string;
  matchesExpected: boolean;
}

@Component({
  selector: 'app-examples',
  imports: [CodeEditor, MatButtonModule, MatIconModule],
  templateUrl: './examples.html',
  styleUrl: './examples.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Examples {
  readonly examples = CODE_EXAMPLES;
  readonly categories = [...new Set(CODE_EXAMPLES.map(example => example.category))];

  readonly selected = signal<CodeExample>(CODE_EXAMPLES[0]);
  readonly draft = signal(CODE_EXAMPLES[0].code);
  readonly outcome = signal<RunOutcome | null>(null);

  readonly inputPreview = computed(() => this.format(this.selected().input));
  readonly expectedPreview = computed(() => this.format(this.selected().expected));
  readonly isDirty = computed(() => this.draft() !== this.selected().code);

  open(example: CodeExample): void {
    this.selected.set(example);
    this.draft.set(example.code);
    this.outcome.set(null);
  }

  reset(): void {
    this.draft.set(this.selected().code);
    this.outcome.set(null);
  }

  run(): void {
    const example = this.selected();
    try {
      const factory = new Function(`"use strict";${this.draft()};return solve;`) as () => unknown;
      const solve = factory();
      if (typeof solve !== 'function') {
        this.outcome.set({ ok: false, output: 'O código precisa definir `function solve(input)`.', matchesExpected: false });
        return;
      }

      const result = (solve as (input: unknown) => unknown)(structuredClone(example.input));
      const output = this.format(result);
      this.outcome.set({ ok: true, output, matchesExpected: output === this.format(example.expected) });
    } catch (error) {
      this.outcome.set({
        ok: false,
        output: error instanceof Error ? `${error.name}: ${error.message}` : String(error),
        matchesExpected: false,
      });
    }
  }

  private format(value: unknown): string {
    try { return JSON.stringify(value, null, 2) ?? String(value); }
    catch { return String(value); }
  }
}
