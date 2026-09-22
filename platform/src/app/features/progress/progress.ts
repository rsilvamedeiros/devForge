import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { CHALLENGES, SKILLS } from '../../core/data/content-index';

@Component({
  selector: 'app-progress',
  imports: [MatButtonModule, MatCheckboxModule, MatIconModule, RouterLink],
  templateUrl: './progress.html',
  styleUrl: './progress.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Progress {
  readonly skills = SKILLS;
  readonly challenges = CHALLENGES;
  readonly completed = signal<string[]>(this.loadCompleted());
  readonly completion = computed(() => Math.round((this.completed().length / CHALLENGES.length) * 100));
  readonly weeklyActivity = [42, 68, 35, 82, 100, 58, 24];
  readonly weekDays = ['S', 'T', 'Q', 'Q', 'S', 'S', 'D'];

  toggleChallenge(slug: string, checked: boolean): void {
    this.completed.update(items => checked ? [...items, slug] : items.filter(item => item !== slug));
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('devforge.completedChallenges', JSON.stringify(this.completed()));
    }
  }

  private loadCompleted(): string[] {
    if (typeof localStorage === 'undefined') return ['frequency-counter', 'two-sum'];
    try {
      const saved = localStorage.getItem('devforge.completedChallenges');
      return saved ? JSON.parse(saved) : ['frequency-counter', 'two-sum'];
    } catch {
      return ['frequency-counter', 'two-sum'];
    }
  }
}
