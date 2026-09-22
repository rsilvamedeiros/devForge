import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { MarkdownComponent } from 'ngx-markdown';
import { map } from 'rxjs';
import { VACANCIES } from '../../../core/data/content-index';

@Component({
  selector: 'app-vacancy-detail',
  imports: [MarkdownComponent, MatCardModule, MatButtonModule, MatTabsModule, RouterLink],
  templateUrl: './vacancy-detail.html',
  styleUrl: './vacancy-detail.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VacancyDetail {
  private readonly route = inject(ActivatedRoute);

  readonly vacancy = toSignal(
    this.route.paramMap.pipe(
      map(params => VACANCIES.find(vacancy => vacancy.slug === params.get('slug')))
    )
  );
}
