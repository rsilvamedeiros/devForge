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
  trend: string;
  tone: string;
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
    { label: 'Skills mapeadas', value: SKILLS.length, icon: 'school', path: '/skills', trend: '+3 no mês', tone: 'violet' },
    { label: 'Vagas ativas', value: VACANCIES.length, icon: 'work_outline', path: '/vacancies', trend: '1 em foco', tone: 'cyan' },
    { label: 'Challenges', value: CHALLENGES.length, icon: 'terminal', path: '/challenges', trend: '2 concluídos', tone: 'green' },
    { label: 'Planos ativos', value: STUDY_PLANS.length, icon: 'calendar_month', path: '/study-plans', trend: '72% da semana', tone: 'amber' },
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

  readonly weekDays = [
    { day: 'S', done: true }, { day: 'T', done: true }, { day: 'Q', done: true },
    { day: 'Q', done: true }, { day: 'S', done: false }, { day: 'S', done: false }, { day: 'D', done: false },
  ];
}
