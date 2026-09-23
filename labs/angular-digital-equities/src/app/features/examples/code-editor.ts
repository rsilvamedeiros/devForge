import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  OnDestroy,
  effect,
  input,
  output,
  viewChild,
} from '@angular/core';

type MonacoEditor = { getValue(): string; setValue(value: string): void; dispose(): void; onDidChangeModelContent(listener: () => void): void };

@Component({
  selector: 'app-code-editor',
  template: `<div class="code-editor__host" #host></div>`,
  styles: `
    :host { display: block; }
    .code-editor__host { height: 340px; overflow: hidden; border: 1px solid var(--trade-border); border-radius: 12px; }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeEditor implements AfterViewInit, OnDestroy {
  readonly value = input.required<string>();
  readonly theme = input<'vs' | 'vs-dark'>('vs-dark');
  readonly valueChange = output<string>();

  private readonly host = viewChild.required<ElementRef<HTMLElement>>('host');
  private editor: MonacoEditor | null = null;

  constructor() {
    effect(() => {
      const next = this.value();
      if (this.editor && this.editor.getValue() !== next) {
        this.editor.setValue(next);
      }
    });
  }

  async ngAfterViewInit(): Promise<void> {
    const monaco = await import('monaco-editor');

    this.editor = monaco.editor.create(this.host().nativeElement, {
      value: this.value(),
      language: 'javascript',
      theme: this.theme(),
      automaticLayout: true,
      minimap: { enabled: false },
      fontSize: 13,
      lineNumbers: 'on',
      scrollBeyondLastLine: false,
      padding: { top: 14, bottom: 14 },
      tabSize: 2,
    }) as unknown as MonacoEditor;

    this.editor.onDidChangeModelContent(() => {
      this.valueChange.emit(this.editor?.getValue() ?? '');
    });
  }

  ngOnDestroy(): void {
    this.editor?.dispose();
  }
}
