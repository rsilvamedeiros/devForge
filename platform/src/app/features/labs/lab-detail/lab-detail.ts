import { ChangeDetectionStrategy, Component, computed, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MarkdownComponent } from 'ngx-markdown';
import { map } from 'rxjs';
import { LABS, SKILLS } from '../../../core/data/content-index';

@Component({
  selector: 'app-lab-detail',
  imports: [MarkdownComponent, MatButtonModule, MatIconModule, MatProgressBarModule, RouterLink],
  templateUrl: './lab-detail.html',
  styleUrl: './lab-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabDetail {
  private readonly route = inject(ActivatedRoute);
  readonly loaded = signal(false);
  readonly activeDocument = signal<'overview' | 'path' | 'exercises' | 'documentation'>('overview');
  readonly selectedDocumentation = signal('');
  readonly lab = toSignal(this.route.paramMap.pipe(map(params => LABS.find(lab => lab.slug === params.get('slug')))));
  readonly documentPath = computed(() => {
    const item = this.lab();
    if (!item) return '';
    if (this.activeDocument() === 'path') return item.learningPath;
    if (this.activeDocument() === 'exercises') return item.exercisesPath;
    if (this.activeDocument() === 'documentation') return this.selectedDocumentation() || item.documentation[0]?.contentPath || item.contentPath;
    return item.contentPath;
  });
  readonly skills = SKILLS;

  skillTitle(slug: string): string {
    return SKILLS.find(skill => skill.slug === slug)?.title ?? slug;
  }

  selectDocument(document: 'overview' | 'path' | 'exercises' | 'documentation'): void {
    this.loaded.set(false);
    this.activeDocument.set(document);
  }

  selectDocumentation(contentPath: string): void {
    this.loaded.set(false);
    this.selectedDocumentation.set(contentPath);
  }

  implementationProgress(): number {
    const modules = this.lab()?.modules ?? [];
    return modules.length ? Math.round(modules.filter(module => module.status === 'implemented').length / modules.length * 100) : 0;
  }
}
