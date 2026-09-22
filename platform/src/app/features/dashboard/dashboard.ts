import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CHALLENGES, SKILLS, STUDY_PLANS, VACANCIES } from '../../core/data/content-index';

interface StatCard {
  label: string;
  value: number;
  icon: string;
  path: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, MatIconModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard {
  readonly stats: StatCard[] = [
    { label: 'Skills em estudo', value: SKILLS.length, icon: 'school', path: '/skills' },
    { label: 'Vagas acompanhadas', value: VACANCIES.length, icon: 'work', path: '/vacancies' },
    { label: 'Challenges disponíveis', value: CHALLENGES.length, icon: 'code', path: '/challenges' },
    { label: 'Planos de estudo', value: STUDY_PLANS.length, icon: 'event_note', path: '/study-plans' },
  ];
}
