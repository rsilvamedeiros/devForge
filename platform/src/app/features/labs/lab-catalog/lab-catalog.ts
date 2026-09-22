import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { RouterLink } from '@angular/router';
import { LABS } from '../../../core/data/content-index';

@Component({
  selector: 'app-lab-catalog',
  imports: [MatButtonModule, MatCardModule, MatIconModule, RouterLink],
  templateUrl: './lab-catalog.html',
  styleUrl: './lab-catalog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LabCatalog {
  readonly labs = LABS;
  readonly activeCount = LABS.filter(lab => lab.status === 'active').length;
  readonly skillCount = new Set(LABS.flatMap(lab => lab.skills)).size;

  implementationProgress(slug: string): number {
    const modules = LABS.find(lab => lab.slug === slug)?.modules ?? [];
    return modules.length ? Math.round(modules.filter(module => module.status === 'implemented').length / modules.length * 100) : 0;
  }
}
