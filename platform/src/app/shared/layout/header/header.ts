import { ChangeDetectionStrategy, Component, output, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { inject } from '@angular/core';
import { CHALLENGES, SKILLS, STUDY_PLANS, VACANCIES } from '../../../core/data/content-index';
import { ThemeService } from '../../../core/services/theme.service';

@Component({
  selector: 'app-header',
  imports: [MatToolbarModule, MatButtonModule, MatIconModule],
  templateUrl: './header.html',
  styleUrl: './header.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Header {
  private readonly router = inject(Router);
  readonly theme = inject(ThemeService);
  readonly menuToggle = output<void>();
  readonly searchTerm = signal('');

  search(event: Event): void {
    event.preventDefault();
    const term = this.searchTerm().trim().toLowerCase();
    if (!term) return;

    const target = [
      ...SKILLS.map(item => ({ title: item.title, path: ['/skills', item.slug] })),
      ...CHALLENGES.map(item => ({ title: item.title, path: ['/challenges', item.slug] })),
      ...VACANCIES.map(item => ({ title: `${item.company} ${item.title}`, path: ['/vacancies', item.slug] })),
      ...STUDY_PLANS.map(item => ({ title: item.title, path: ['/study-plans', item.slug] })),
    ].find(item => item.title.toLowerCase().includes(term));

    if (target) this.router.navigate(target.path);
    else this.router.navigate(['/skills'], { queryParams: { q: term } });
  }
}
