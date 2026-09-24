import { ChangeDetectionStrategy, Component, computed, signal } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { TECHNICAL_QUESTIONS } from '../technical-assessments/technical-assessment-bank';
import { CodeBlock } from '../../shared/ui/code-block/code-block';

@Component({selector:'app-quick-quiz',imports:[MatIconModule,CodeBlock],templateUrl:'./quick-quiz.html',styleUrl:'./quick-quiz.scss',changeDetection:ChangeDetectionStrategy.OnPush})
export class QuickQuiz {
  readonly questions=TECHNICAL_QUESTIONS.slice(0,10); readonly index=signal(0); readonly selected=signal<number|null>(null); readonly score=signal(0); readonly streak=signal(0); readonly bestStreak=signal(0); readonly bestScore=signal(this.restoreBest()); readonly finished=signal(false);
  readonly question=computed(()=>this.questions[this.index()]); readonly progress=computed(()=>Math.round((this.index()+(this.selected()!==null?1:0))/this.questions.length*100)); readonly correct=computed(()=>this.selected()===this.question().answer);
  choose(option:number):void{if(this.selected()!==null)return;this.selected.set(option);if(option===this.question().answer){this.score.update(v=>v+1);this.streak.update(v=>v+1);this.bestStreak.update(v=>Math.max(v,this.streak()))}else this.streak.set(0)}
  next():void{if(this.index()===this.questions.length-1){this.finished.set(true);if(this.score()>this.bestScore()){this.bestScore.set(this.score());try{localStorage.setItem('angular-learning-lab.quick-quiz-best',String(this.score()))}catch{}}return}this.index.update(v=>v+1);this.selected.set(null)}
  restart():void{this.index.set(0);this.selected.set(null);this.score.set(0);this.streak.set(0);this.bestStreak.set(0);this.finished.set(false)}
  private restoreBest():number{try{return Number(localStorage.getItem('angular-learning-lab.quick-quiz-best')??0)}catch{return 0}}
}
