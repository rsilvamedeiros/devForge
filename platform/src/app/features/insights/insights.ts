import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-insights',
  imports: [MatIconModule, RouterLink],
  templateUrl: './insights.html',
  styleUrl: './insights.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Insights {
  readonly heatmap = [0, 1, 2, 0, 3, 2, 0, 1, 3, 4, 2, 0, 1, 0, 2, 4, 3, 2, 1, 0, 0, 2, 3, 4, 3, 2, 1, 2];
  readonly trackPerformance = [
    { name: 'Frontend Specialist', value: 68, delta: '+12%', color: '#6558f5' },
    { name: 'Computer Science', value: 44, delta: '+8%', color: '#48c9d4' },
    { name: 'Software Engineering', value: 36, delta: '+5%', color: '#f0a44b' },
  ];
}
