import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { RouterLink } from '@angular/router';
import { CHALLENGES } from '../../../core/data/content-index';

@Component({
  selector: 'app-challenge-catalog',
  imports: [MatCardModule, MatChipsModule, MatFormFieldModule, MatInputModule, RouterLink],
  templateUrl: './challenge-catalog.html',
  styleUrl: './challenge-catalog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChallengeCatalog {
  readonly categories = ['all', ...new Set(CHALLENGES.map(challenge => challenge.category))];

  readonly searchTerm = signal('');
  readonly selectedCategory = signal<string>('all');

  readonly filteredChallenges = computed(() => {
    const term = this.searchTerm().trim().toLowerCase();
    const category = this.selectedCategory();

    return CHALLENGES.filter(challenge => {
      const matchesTerm = !term || challenge.title.toLowerCase().includes(term);
      const matchesCategory = category === 'all' || challenge.category === category;
      return matchesTerm && matchesCategory;
    });
  });

  onSearchInput(event: Event): void {
    this.searchTerm.set((event.target as HTMLInputElement).value);
  }

  selectCategory(category: string): void {
    this.selectedCategory.set(category);
  }
}
