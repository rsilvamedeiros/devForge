import { ChangeDetectionStrategy, Component, input, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({ selector: 'app-code-block', imports: [MatIconModule], templateUrl: './code-block.html', styleUrl: './code-block.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class CodeBlock {
  readonly code = input.required<string>();
  readonly language = input('typescript');
  readonly filename = input('example.ts');
  readonly copied = signal(false);

  async copy(): Promise<void> {
    await navigator.clipboard.writeText(this.code());
    this.copied.set(true);
    window.setTimeout(() => this.copied.set(false), 1800);
  }
}
