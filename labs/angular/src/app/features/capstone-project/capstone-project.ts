import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { CAPSTONE_SPRINTS, CAPSTONE_TASK_COUNT } from './capstone-project.data';

const STORAGE_KEY = 'angular-capstone-progress';

@Component({
  selector: 'app-capstone-project',
  imports: [MatIconModule],
  templateUrl: './capstone-project.html',
  styleUrl: './capstone-project.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CapstoneProject {
  readonly sprints = CAPSTONE_SPRINTS;
  readonly totalTasks = CAPSTONE_TASK_COUNT;
  readonly selectedSprintId = signal(this.sprints[0].id);
  readonly completedTasks = signal<string[]>(this.restore());
  readonly selectedSprint = computed(() => this.sprints.find(item => item.id === this.selectedSprintId())!);
  readonly completedCount = computed(() => this.completedTasks().length);
  readonly progress = computed(() => Math.round((this.completedCount() / this.totalTasks) * 100));
  readonly readyForReview = computed(() => this.completedCount() === this.totalTasks);

  sprintProgress(sprintId: string): number {
    const sprint = this.sprints.find(item => item.id === sprintId)!;
    const completed = sprint.tasks.filter(task => this.isCompleted(task.id)).length;
    return Math.round((completed / sprint.tasks.length) * 100);
  }

  isCompleted(taskId: string): boolean {
    return this.completedTasks().includes(taskId);
  }

  toggle(taskId: string): void {
    this.completedTasks.update(tasks => tasks.includes(taskId) ? tasks.filter(id => id !== taskId) : [...tasks, taskId]);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(this.completedTasks())); } catch { /* progresso da sessão */ }
  }

  private restore(): string[] {
    try {
      const value = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]');
      return Array.isArray(value) ? value.filter(item => typeof item === 'string') : [];
    } catch { return []; }
  }
}
