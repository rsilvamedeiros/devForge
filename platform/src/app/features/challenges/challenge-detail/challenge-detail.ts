import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MarkdownComponent } from 'ngx-markdown';
import { map } from 'rxjs';
import { CHALLENGES } from '../../../core/data/content-index';

@Component({
  selector: 'app-challenge-detail',
  imports: [MarkdownComponent, MatCardModule, MatButtonModule, MatProgressBarModule, RouterLink],
  templateUrl: './challenge-detail.html',
  styleUrl: './challenge-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChallengeDetail {
  private readonly route = inject(ActivatedRoute);

  readonly challenge = toSignal(
    this.route.paramMap.pipe(
      map(params => CHALLENGES.find(challenge => challenge.slug === params.get('slug')))
    )
  );

  readonly loaded = signal(false);
}
