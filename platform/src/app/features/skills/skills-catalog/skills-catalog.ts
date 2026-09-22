import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { SKILL_CATEGORY_LABELS, SKILLS } from '../../../core/data/content-index';
import { SkillCategory } from '../../../core/models/content.model';

type CategoryFilter = SkillCategory | 'all';

@Component({
  selector: 'app-skills-catalog',
  imports: [MatCardModule, MatChipsModule, MatFormFieldModule, MatInputModule, RouterLink],
  templateUrl: './skills-catalog.html',
  styleUrl: './skills-catalog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SkillsCatalog {
  readonly categoryLabels = SKILL_CATEGORY_LABELS;
  readonly categories = Object.keys(SKILL_CATEGORY_LABELS) as SkillCategory[];

  readonly searchTerm = signal('');
  readonly selectedCategory = signal<CategoryFilter>('all');

  readonly skillsByCategory = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const category = this.selectedCategory();

    return this.categories
      .filter(cat => category === 'all' || cat === category)
      .map(cat => ({
        category: cat,
        label: this.categoryLabels[cat],
        skills: SKILLS.filter(
          skill => skill.category === cat && (!term || skill.title.toLowerCase().includes(term))
        ),
      }))
      .filter(group => group.skills.length > 0);
  });

  onSearchInput(event: Event): void {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }

  selectCategory(category: CategoryFilter): void {
    this.selectedCategory.set(category);
  }
}
