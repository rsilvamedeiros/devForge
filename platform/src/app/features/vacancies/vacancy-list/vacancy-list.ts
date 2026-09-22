import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { VACANCIES } from '../../../core/data/content-index';

@Component({
  selector: 'app-vacancy-list',
  imports: [MatCardModule, RouterLink],
  templateUrl: './vacancy-list.html',
  styleUrl: './vacancy-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class VacancyList {
  readonly vacancies = VACANCIES;
}
