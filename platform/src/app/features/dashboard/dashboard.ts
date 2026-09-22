import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import {
  CHALLENGES,
  SKILL_CATEGORY_LABELS,
  SKILLS,
  STUDY_PLANS,
  VACANCIES,
} from '../../core/data/content-index';
import { SkillCategory } from '../../core/models/content.model';

interface StatCard {
  label: string;
  value: number;
  icon: string;
  path: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [MatCardModule, MatIconModule, MatButtonModule, RouterLink],
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

  readonly focusVacancy = VACANCIES[0];

  readonly categoryBreakdown = (Object.keys(SKILL_CATEGORY_LABELS) as SkillCategory[]).map(
    category => ({
      category,
      label: SKILL_CATEGORY_LABELS[category],
      count: SKILLS.filter(skill => skill.category === category).length,
    })
  );

  readonly maxCategoryCount = Math.max(...this.categoryBreakdown.map(group => group.count));

  readonly recentSkills = SKILLS.slice(0, 4);
}
