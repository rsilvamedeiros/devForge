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
  readonly assessedSkills = SKILLS.filter(skill => skill.currentLevel !== null).length;
  readonly evidenceCount = SKILLS.reduce((sum, skill) => sum + skill.evidenceCount, 0);
  readonly completed = signal<string[]>(this.loadCompleted());
  readonly completion = computed(() => Math.round((this.completed().length / CHALLENGES.length) * 100));

  toggleChallenge(slug: string, checked: boolean): void {
    this.completed.update(items => checked ? [...items, slug] : items.filter(item => item !== slug));
    try {
      localStorage.setItem('devforge.completedChallenges', JSON.stringify(this.completed()));
    } catch {
      // A seleção continua ativa durante a sessão.
    }
  }

  private loadCompleted(): string[] {
    try {
      const saved = localStorage.getItem('devforge.completedChallenges');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  }
}
