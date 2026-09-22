import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
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
  readonly lab = toSignal(this.route.paramMap.pipe(map(params => LABS.find(lab => lab.slug === params.get('slug')))));
  readonly skills = SKILLS;

  skillTitle(slug: string): string {
    return SKILLS.find(skill => skill.slug === slug)?.title ?? slug;
  }
}
