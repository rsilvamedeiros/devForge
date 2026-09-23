import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MarkdownComponent } from 'ngx-markdown';
import { DOCUMENTATION_CHAPTERS, DocumentChapter } from './documentation-chapters';

@Component({
  selector: 'app-documentation',
  imports: [MarkdownComponent, MatIconModule, MatProgressBarModule],
  templateUrl: './documentation.html',
  styleUrl: './documentation.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Documentation {
  readonly chapters = DOCUMENTATION_CHAPTERS;
  readonly selected = signal(this.chapters[0]);
  readonly loaded = signal(false);

  open(chapter: DocumentChapter): void {
    this.loaded.set(false);
    this.selected.set(chapter);
  }
}
