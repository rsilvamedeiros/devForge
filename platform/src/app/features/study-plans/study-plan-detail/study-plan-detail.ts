import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MarkdownComponent } from 'ngx-markdown';
import { map } from 'rxjs';
import { STUDY_PLANS } from '../../../core/data/content-index';

@Component({
  selector: 'app-study-plan-detail',
  imports: [MarkdownComponent, MatCardModule, MatButtonModule, MatProgressBarModule, RouterLink],
  templateUrl: './study-plan-detail.html',
  styleUrl: './study-plan-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudyPlanDetail {
  private readonly route = inject(ActivatedRoute);

  readonly plan = toSignal(
    this.route.paramMap.pipe(
      map(params => STUDY_PLANS.find(plan => plan.slug === params.get('slug')))
    )
  );

  readonly loaded = signal(false);
}
