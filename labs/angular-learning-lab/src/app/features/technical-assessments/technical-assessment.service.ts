import { Injectable, signal } from '@angular/core';

export interface TechnicalResult { correct:number; total:number; percent:number; passed:boolean; takenAt:string; }
const STORAGE_KEY='angular-learning-lab.technical-results';

@Injectable({providedIn:'root'})
export class TechnicalAssessmentService {
  readonly results=signal<Record<string,TechnicalResult>>(this.restore());
  record(id:string,result:TechnicalResult):void { const previous=this.results()[id]; if(previous && previous.percent>result.percent)return; this.results.update(current=>({...current,[id]:result})); try{localStorage.setItem(STORAGE_KEY,JSON.stringify(this.results()))}catch{} }
  resultFor(id:string):TechnicalResult|undefined{return this.results()[id]}
  private restore():Record<string,TechnicalResult>{try{return JSON.parse(localStorage.getItem(STORAGE_KEY)??'{}')}catch{return {}}}
}

