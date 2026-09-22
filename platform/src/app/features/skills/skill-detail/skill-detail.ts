import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MarkdownComponent } from 'ngx-markdown';
import { map } from 'rxjs';
import { SKILL_CATEGORY_LABELS, SKILLS } from '../../../core/data/content-index';

@Component({
  selector: 'app-skill-detail',
  imports: [MarkdownComponent, MatCardModule, MatButtonModule, MatProgressBarModule, RouterLink],
  templateUrl: './skill-detail.html',
  styleUrl: './skill-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillDetail {
  private readonly route = inject(ActivatedRoute);

  readonly categoryLabels = SKILL_CATEGORY_LABELS;

  readonly skill = toSignal(
    this.route.paramMap.pipe(map(params => SKILLS.find(skill => skill.slug === params.get('slug'))))
  );

  readonly loaded = signal(false);
}
