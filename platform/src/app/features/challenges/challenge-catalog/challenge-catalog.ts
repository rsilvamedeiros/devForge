import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatChipsModule } from '@angular/material/chips';
import { RouterLink } from '@angular/router';
import { CHALLENGES } from '../../../core/data/content-index';

@Component({
  selector: 'app-challenge-catalog',
  imports: [MatCardModule, MatChipsModule, RouterLink],
  templateUrl: './challenge-catalog.html',
  styleUrl: './challenge-catalog.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ChallengeCatalog {
  readonly challenges = CHALLENGES;
}
