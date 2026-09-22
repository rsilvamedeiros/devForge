import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import {
  CHALLENGES,
  LABS,
  SKILL_CATEGORY_LABELS,
  SKILLS,
  VACANCIES,
} from '../../core/data/content-index';
import { SkillCategory } from '../../core/models/content.model';

interface StatCard {
  label: string;
  value: number;
  icon: string;
  path: string;
  note: string;
  tone: string;
}

@Component({
  selector: 'app-dashboard',
  imports: [MatButtonModule, MatIconModule, RouterLink],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Dashboard {
  readonly currentDate = new Intl.DateTimeFormat('pt-BR', {
    weekday: 'long',
    day: '2-digit',
    month: 'long',
  }).format(new Date());

  readonly assessedSkills = SKILLS.filter(skill => skill.currentLevel !== null).length;
  readonly skillsCount = SKILLS.length;
  readonly evidenceCount = SKILLS.reduce((sum, skill) => sum + skill.evidenceCount, 0);
  readonly focusVacancy = VACANCIES[0];
  readonly recentSkills = SKILLS.slice(0, 4);
  readonly labs = LABS;

  readonly stats: StatCard[] = [
    { label: 'Skills mapeadas', value: SKILLS.length, icon: 'school', path: '/skills', note: `${this.assessedSkills} avaliadas`, tone: 'violet' },
    { label: 'Vagas registradas', value: VACANCIES.length, icon: 'work_outline', path: '/vacancies', note: 'Fonte real do repositório', tone: 'cyan' },
    { label: 'Challenges', value: CHALLENGES.length, icon: 'terminal', path: '/challenges', note: 'Conclusão registrada manualmente', tone: 'green' },
    { label: 'Labs', value: LABS.length, icon: 'science', path: '/labs', note: 'Projetos de integração', tone: 'amber' },
  ];

  readonly categoryBreakdown = (Object.keys(SKILL_CATEGORY_LABELS) as SkillCategory[]).map(
    category => ({
      category,
      label: SKILL_CATEGORY_LABELS[category],
      count: SKILLS.filter(skill => skill.category === category).length,
    })
  );
  readonly categoryColors = ['#6558f5', '#48c9d4', '#f0a44b'];
  readonly coverageGradient = this.buildCoverageGradient();

  private buildCoverageGradient(): string {
    const total = this.categoryBreakdown.reduce((sum, group) => sum + group.count, 0);
    let start = 0;
    const stops = this.categoryBreakdown.map((group, index) => {
      const end = start + (group.count / total) * 100;
      const stop = `${this.categoryColors[index]} ${start}% ${end}%`;
      start = end;
      return stop;
    });
    return `conic-gradient(${stops.join(', ')})`;
  }
}
