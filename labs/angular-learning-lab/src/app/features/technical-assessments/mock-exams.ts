import { ChangeDetectionStrategy, Component } from '@angular/core';
import { AssessmentWorkspace } from './assessment-workspace';
@Component({selector:'app-mock-exams',imports:[AssessmentWorkspace],template:'<section class="lab-page"><app-assessment-workspace mode="mock"/></section>',changeDetection:ChangeDetectionStrategy.OnPush})
export class MockExams {}
