import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AssessmentWorkspace } from './assessment-workspace';
@Component({selector:'app-technical-tests',imports:[AssessmentWorkspace],template:'<section class="lab-page"><app-assessment-workspace mode="quiz"/></section>',changeDetection:ChangeDetectionStrategy.OnPush})
export class TechnicalTests {}

