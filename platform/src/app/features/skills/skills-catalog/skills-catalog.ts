import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { RouterLink } from '@angular/router';
import { SKILL_CATEGORY_LABELS, SKILLS } from '../../../core/data/content-index';
import { SkillCategory } from '../../../core/models/content.model';

@Component({
  selector: 'app-skills-catalog',
  imports: [MatCardModule, MatChipsModule, RouterLink],
  templateUrl: './skills-catalog.html',
  styleUrl: './skills-catalog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsCatalog {
  readonly categoryLabels = SKILL_CATEGORY_LABELS;
  readonly categories = Object.keys(SKILL_CATEGORY_LABELS) as SkillCategory[];

  readonly skillsByCategory = this.categories.map(category => ({
    category,
    label: SKILL_CATEGORY_LABELS[category],
    skills: SKILLS.filter(skill => skill.category === category),
  }));
}
