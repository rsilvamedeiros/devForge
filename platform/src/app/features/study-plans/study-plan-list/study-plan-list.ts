import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { STUDY_PLANS } from '../../../core/data/content-index';

@Component({
  selector: 'app-study-plan-list',
  imports: [MatCardModule, RouterLink],
  templateUrl: './study-plan-list.html',
  styleUrl: './study-plan-list.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class StudyPlanList {
  readonly studyPlans = STUDY_PLANS;
}
