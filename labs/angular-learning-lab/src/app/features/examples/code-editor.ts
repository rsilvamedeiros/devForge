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

type MonacoModel = object;
type MonacoEditor = { getValue(): string; setValue(value: string): void; getModel(): MonacoModel | null; dispose(): void; onDidChangeModelContent(listener: () => void): void };
type MonacoApi = { editor: { setModelLanguage(model: MonacoModel, language: string): void } };

@Component({
  selector: 'app-code-editor',
  template: `<div class="code-editor__host" #host></div>`,
  styles: `
    :host { display: block; }
    .code-editor__host { height: 340px; overflow: hidden; border: 1px solid var(--lab-border); border-radius: 12px; }
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CodeEditor implements AfterViewInit, OnDestroy {
  readonly value = input.required<string>();
  readonly theme = input<'vs' | 'vs-dark'>('vs-dark');
  readonly language = input('javascript');
  readonly valueChange = output<string>();

  private readonly host = viewChild.required<ElementRef<HTMLElement>>('host');
  private editor: MonacoEditor | null = null;
  private monaco: MonacoApi | null = null;

  constructor() {
    effect(() => {
      const next = this.value();
      if (this.editor && this.editor.getValue() !== next) {
        this.editor.setValue(next);
      }
    });
    effect(() => {
      const language = this.language();
      const model = this.editor?.getModel();
      if (model && this.monaco) this.monaco.editor.setModelLanguage(model, language);
    });
  }

  async ngAfterViewInit(): Promise<void> {
    const monaco = await import('monaco-editor');
    this.monaco = monaco as unknown as MonacoApi;

    this.editor = monaco.editor.create(this.host().nativeElement, {
      value: this.value(),
      language: this.language(),
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
