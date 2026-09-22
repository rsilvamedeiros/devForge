import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';

@Component({ selector: 'app-analytics', imports: [MatIconModule], templateUrl: './analytics.html', styleUrl: './analytics.scss', changeDetection: ChangeDetectionStrategy.OnPush })
export class Analytics {
  readonly heatmap = [1,2,3,1,0,2,4,3,2,1,3,4,2,0,1,3,4,4,2,1,0,2,3,4,3,2,1,2];
}
