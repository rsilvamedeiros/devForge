import { ChangeDetectionStrategy, Component, OnDestroy, computed, inject, input, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { AssessmentMode, TECHNICAL_ASSESSMENTS, TechnicalAssessmentPack } from './technical-assessment-bank';
import { TechnicalAssessmentService } from './technical-assessment.service';

@Component({selector:'app-assessment-workspace',imports:[MatButtonModule,MatIconModule,MatProgressBarModule],templateUrl:'./assessment-workspace.html',styleUrl:'./assessment-workspace.scss',changeDetection:ChangeDetectionStrategy.OnPush})
export class AssessmentWorkspace implements OnDestroy {
  readonly mode=input.required<AssessmentMode>();
  readonly progress=inject(TechnicalAssessmentService);
  readonly active=signal<TechnicalAssessmentPack|null>(null);
  readonly answers=signal<Record<string,number>>({});
  readonly submitted=signal(false);
  readonly remainingSeconds=signal(0);
  private timer?:ReturnType<typeof setInterval>;

  readonly packs=computed(()=>TECHNICAL_ASSESSMENTS.filter(pack=>pack.mode===this.mode()));
  readonly answered=computed(()=>Object.keys(this.answers()).length);
  readonly correct=computed(()=>this.active()?.questions.filter(question=>this.answers()[question.id]===question.answer).length??0);
  readonly percent=computed(()=>this.active()?Math.round(this.correct()/this.active()!.questions.length*100):0);
  readonly passed=computed(()=>!!this.active()&&this.percent()>=this.active()!.passScore);
  readonly clock=computed(()=>`${Math.floor(this.remainingSeconds()/60).toString().padStart(2,'0')}:${(this.remainingSeconds()%60).toString().padStart(2,'0')}`);

  start(pack:TechnicalAssessmentPack):void { this.stopTimer(); this.active.set(pack); this.answers.set({}); this.submitted.set(false); this.remainingSeconds.set(pack.duration*60); this.timer=setInterval(()=>{this.remainingSeconds.update(value=>Math.max(0,value-1));if(this.remainingSeconds()===0)this.submit(true)},1000); }
  choose(id:string,index:number):void { if(!this.submitted())this.answers.update(current=>({...current,[id]:index})); }
  submit(force=false):void { const pack=this.active(); if(!pack||this.submitted()||(!force&&this.answered()<pack.questions.length))return; this.stopTimer(); this.submitted.set(true); this.progress.record(pack.id,{correct:this.correct(),total:pack.questions.length,percent:this.percent(),passed:this.passed(),takenAt:new Date().toISOString()}); }
  close():void { this.stopTimer();this.active.set(null);this.answers.set({});this.submitted.set(false); }
  retry():void { const pack=this.active();if(pack)this.start(pack); }
  ngOnDestroy():void { this.stopTimer(); }
  private stopTimer():void { if(this.timer){clearInterval(this.timer);this.timer=undefined} }
}

