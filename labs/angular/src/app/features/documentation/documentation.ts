import { ChangeDetectionStrategy, Component, ElementRef, computed, inject, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MarkdownComponent } from 'ngx-markdown';
import { DOCUMENTATION_CHAPTERS, DocumentChapter } from './documentation-chapters';
import { ANGULAR_DOC_VERSIONS } from './angular-version-history';

@Component({
  selector: 'app-documentation',
  imports: [MarkdownComponent, MatIconModule, MatProgressBarModule],
  templateUrl: './documentation.html',
  styleUrls: ['./documentation.scss', './version-selector.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Documentation {
  private readonly host: ElementRef<HTMLElement> = inject(ElementRef);
  readonly chapters = DOCUMENTATION_CHAPTERS;
  readonly query = signal('');
  readonly filteredChapters = computed(() => {
    const term = this.query().trim().toLowerCase();
    return this.chapters.filter(chapter => !term || `${chapter.title} ${chapter.description}`.toLowerCase().includes(term));
  });
  readonly selected = signal(this.chapters[0]);
  readonly loaded = signal(false);
  readonly versions = ANGULAR_DOC_VERSIONS;
  readonly selectedVersion = signal(this.versions[0]);

  selectVersion(version: string): void {
    this.selectedVersion.set(this.versions.find(item => item.version === version) ?? this.versions[0]);
  }

  open(chapter: DocumentChapter): void {
    this.loaded.set(false);
    this.selected.set(chapter);
  }

  markdownReady(): void {
    this.loaded.set(true);
    window.setTimeout(() => {
      this.host.nativeElement.querySelectorAll('.documentation__markdown pre').forEach((pre: Element) => {
        if (pre.parentElement?.classList.contains('markdown-code-window')) return;
        const frame = document.createElement('div');
        frame.className = 'markdown-code-window';
        const toolbar = document.createElement('div');
        toolbar.className = 'markdown-code-window__toolbar';
        toolbar.innerHTML = '<span><i></i><i></i><i></i></span><strong>Exemplo de código</strong><button type="button" data-copy-code>content_copy&nbsp; Copiar</button>';
        pre.parentNode?.insertBefore(frame, pre);
        frame.append(toolbar, pre);
      });
    });
  }

  async copyMarkdownCode(event: MouseEvent): Promise<void> {
    const button = (event.target as HTMLElement).closest<HTMLButtonElement>('[data-copy-code]');
    if (!button) return;
    const code = button.closest('.markdown-code-window')?.querySelector('code')?.textContent ?? '';
    await navigator.clipboard.writeText(code);
    button.textContent = 'check  Copiado';
    window.setTimeout(() => button.textContent = 'content_copy  Copiar', 1800);
  }
}
