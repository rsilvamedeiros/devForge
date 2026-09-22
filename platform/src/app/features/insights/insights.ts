import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CHALLENGES, LABS, SKILLS, VACANCIES } from '../../core/data/content-index';

@Component({
  selector: 'app-insights',
  imports: [MatIconModule, RouterLink],
  templateUrl: './insights.html',
  styleUrl: './insights.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Insights {
  readonly assessedSkills = SKILLS.filter(skill => skill.currentLevel !== null).length;
  readonly evidenceCount = SKILLS.reduce((sum, skill) => sum + skill.evidenceCount, 0);
  readonly skillsCount = SKILLS.length;
  readonly challengesCount = CHALLENGES.length;
  readonly labsCount = LABS.length;
  readonly vacanciesCount = VACANCIES.length;
}
